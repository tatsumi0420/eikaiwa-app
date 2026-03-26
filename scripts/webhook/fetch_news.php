<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// --- Configuration ---
$CACHE_DIR = __DIR__ . '/data/rss_cache';
$CACHE_TTL = 1800; // 30 minutes

$FEEDS = [
    // Tech
    ['url' => 'https://feeds.feedburner.com/TechCrunch', 'source' => 'TechCrunch'],
    ['url' => 'https://www.theverge.com/rss/index.xml', 'source' => 'The Verge'],
    ['url' => 'https://feeds.arstechnica.com/arstechnica/index', 'source' => 'Ars Technica'],
    ['url' => 'https://hnrss.org/frontpage', 'source' => 'Hacker News'],
    ['url' => 'https://www.technologyreview.com/feed', 'source' => 'MIT Technology Review'],
    // Agile
    ['url' => 'https://www.agilealliance.org/feed', 'source' => 'Agile Alliance'],
    ['url' => 'https://www.scrum.org/resources/blog/feed', 'source' => 'Scrum.org'],
    ['url' => 'https://martinfowler.com/feed.atom', 'source' => 'Martin Fowler'],
    ['url' => 'https://feed.infoq.com/agile', 'source' => 'InfoQ Agile'],
    // Testing
    ['url' => 'https://www.ministryoftesting.com/feeds/blogs', 'source' => 'Ministry of Testing'],
];

$count = isset($_GET['count']) ? max(1, min(10, intval($_GET['count']))) : 3;

// --- Cache ---
if (!is_dir($CACHE_DIR)) {
    mkdir($CACHE_DIR, 0755, true);
}

$cacheFile = $CACHE_DIR . '/feeds.json';
$articles = [];

if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $CACHE_TTL) {
    $articles = json_decode(file_get_contents($cacheFile), true) ?: [];
} else {
    $articles = fetchAllFeeds($FEEDS);
    file_put_contents($cacheFile, json_encode($articles, JSON_UNESCAPED_UNICODE));
}

if (empty($articles)) {
    echo json_encode(['articles' => [], 'error' => 'No articles found']);
    exit;
}

// Shuffle and pick $count articles
shuffle($articles);
$selected = array_slice($articles, 0, $count);

echo json_encode(['articles' => $selected], JSON_UNESCAPED_UNICODE);
exit;

// --- Functions ---

function fetchAllFeeds(array $feeds): array {
    $articles = [];

    // Use multi-curl for parallel fetching
    $multiHandle = curl_multi_init();
    $handles = [];

    foreach ($feeds as $i => $feed) {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $feed['url'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; EikaiwaApp/1.0)',
            CURLOPT_SSL_VERIFYPEER => true,
        ]);
        $handles[$i] = $ch;
        curl_multi_add_handle($multiHandle, $ch);
    }

    // Execute all requests
    $running = null;
    do {
        curl_multi_exec($multiHandle, $running);
        curl_multi_select($multiHandle);
    } while ($running > 0);

    // Process results
    foreach ($handles as $i => $ch) {
        $body = curl_multi_getcontent($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_multi_remove_handle($multiHandle, $ch);
        curl_close($ch);

        if ($httpCode !== 200 || empty($body)) continue;

        $feedArticles = parseFeed($body, $feeds[$i]['source']);
        $articles = array_merge($articles, $feedArticles);
    }

    curl_multi_close($multiHandle);

    // Sort by date descending, keep recent articles
    usort($articles, function ($a, $b) {
        return strtotime($b['date']) - strtotime($a['date']);
    });

    // Keep up to 50 most recent
    return array_slice($articles, 0, 50);
}

function parseFeed(string $xml, string $source): array {
    $articles = [];

    libxml_use_internal_errors(true);
    $doc = simplexml_load_string($xml);
    if ($doc === false) return [];

    // Detect feed type: RSS 2.0 or Atom
    if (isset($doc->channel->item)) {
        // RSS 2.0
        foreach ($doc->channel->item as $item) {
            $title = trim((string)$item->title);
            $url = trim((string)$item->link);
            $date = (string)$item->pubDate;

            if (empty($title) || empty($url)) continue;

            $articles[] = [
                'title' => $title,
                'url' => $url,
                'date' => date('Y-m-d', strtotime($date) ?: time()),
                'source' => $source,
            ];
        }
    } elseif (isset($doc->entry)) {
        // Atom
        foreach ($doc->entry as $entry) {
            $title = trim((string)$entry->title);
            $url = '';

            // Atom link can be in href attribute
            if (isset($entry->link)) {
                foreach ($entry->link as $link) {
                    $rel = (string)$link['rel'];
                    if ($rel === 'alternate' || $rel === '') {
                        $url = (string)$link['href'];
                        break;
                    }
                }
                if (empty($url)) {
                    $url = (string)$entry->link['href'];
                }
            }

            $date = (string)($entry->published ?? $entry->updated ?? '');

            if (empty($title) || empty($url)) continue;

            $articles[] = [
                'title' => $title,
                'url' => $url,
                'date' => date('Y-m-d', strtotime($date) ?: time()),
                'source' => $source,
            ];
        }
    } elseif (isset($doc->item)) {
        // RSS 1.0 (RDF)
        foreach ($doc->item as $item) {
            $title = trim((string)$item->title);
            $url = trim((string)$item->link);
            $date = '';
            // dc:date namespace
            $dc = $item->children('http://purl.org/dc/elements/1.1/');
            if (isset($dc->date)) {
                $date = (string)$dc->date;
            }

            if (empty($title) || empty($url)) continue;

            $articles[] = [
                'title' => $title,
                'url' => $url,
                'date' => date('Y-m-d', strtotime($date) ?: time()),
                'source' => $source,
            ];
        }
    }

    // Limit to 5 latest per source
    return array_slice($articles, 0, 5);
}

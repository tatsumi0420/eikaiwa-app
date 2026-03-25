<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['urls']) || !is_array($input['urls'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request. Expected {"urls": [...]}']);
    exit;
}

$urls = array_slice($input['urls'], 0, 10); // max 10 URLs
$results = [];

foreach ($urls as $url) {
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        $results[] = ['url' => $url, 'status' => 0, 'valid' => false];
        continue;
    }

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_NOBODY => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 5,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; URLVerifier/1.0)',
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    // HEAD request may be blocked by some servers, try GET if HEAD returns 405/403
    if ($httpCode === 405 || $httpCode === 403) {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 5,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; URLVerifier/1.0)',
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_RANGE => '0-1023', // Only fetch first 1KB
        ]);
        curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
    }

    $valid = in_array($httpCode, [200, 201, 206, 301, 302, 303, 307, 308]);
    $results[] = ['url' => $url, 'status' => $httpCode, 'valid' => $valid];
}

echo json_encode(['results' => $results]);

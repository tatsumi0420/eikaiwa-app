const VOCAB_DATA = {
    "気持ち（ポジティブ）": [
        {
            ja: "昨日見た映画感動したよ",
            ways: [
                { en: "I was really moved by the movie.", key: "moved by ~", explanation: "「～に感動した」。心が動かされた時に使う定番表現。" },
                { en: "The movie really touched me.", key: "~ touched me", explanation: "「心に触れた」イメージ。じんわり感動した時にぴったり。" },
                { en: "It was such a great movie.", key: "such a ~", explanation: "「とても～な」と強調するシンプルな形。日常で一番使いやすい。" },
            ]
        },
        {
            ja: "試験受かった！信じられない",
            ways: [
                { en: "I passed! I can't believe it!", key: "I can't believe ~", explanation: "「信じられない！」驚きや喜びを表す万能フレーズ。" },
                { en: "I made it! I'm so happy!", key: "I made it", explanation: "「やり遂げた・受かった」。目標を達成した時に幅広く使える。" },
                { en: "I did it! It doesn't feel real.", key: "It doesn't feel real", explanation: "「実感がわかない」。嬉しすぎて現実じゃないみたいな時に。" },
            ]
        },
        {
            ja: "ずっと欲しかったやつやっと買えた",
            ways: [
                { en: "I finally got what I've been wanting.", key: "I finally got ~", explanation: "「やっと手に入れた」。長い間待った後に使う達成感の表現。" },
                { en: "I've been wanting this for so long.", key: "I've been ~ing for so long", explanation: "「ずっと～してた」。現在完了進行形で「長い間の思い」を表す。" },
                { en: "I saved up and bought it.", key: "saved up", explanation: "「お金を貯めて」。努力して手に入れたニュアンスが加わる。" },
            ]
        },
    ],
    "気持ち（ネガティブ）": [
        {
            ja: "今日の会議だるいな",
            ways: [
                { en: "I don't feel like going to the meeting.", key: "I don't feel like ~ing", explanation: "「～する気分じゃない」。やりたくない時の定番。気持ちを柔らかく伝える。" },
                { en: "I'm not looking forward to the meeting.", key: "not looking forward to ~", explanation: "「楽しみじゃない」。look forward to の否定形で控えめに嫌さを伝える。" },
                { en: "The meeting is going to be boring.", key: "~ is going to be ~", explanation: "「～になりそう」。未来の予想を述べる基本形。" },
            ]
        },
        {
            ja: "昨日寝れなくてしんどい",
            ways: [
                { en: "I couldn't sleep last night. I'm so tired.", key: "I couldn't sleep", explanation: "「眠れなかった」。シンプルで一番伝わりやすい。" },
                { en: "I didn't get enough sleep.", key: "get enough sleep", explanation: "「十分な睡眠が取れなかった」。睡眠不足を表す自然な言い方。" },
                { en: "I'm exhausted because I barely slept.", key: "barely ~", explanation: "「ほとんど～しなかった」。ギリギリ感を強調する副詞。" },
            ]
        },
        {
            ja: "せっかくの休みなのに雨かよ",
            ways: [
                { en: "It's raining on my day off.", key: "on my day off", explanation: "「休みの日に」。day off は「休日」のカジュアルな言い方。" },
                { en: "I was hoping for good weather today.", key: "I was hoping for ~", explanation: "「～を期待してたのに」。叶わなかった期待を表す。" },
                { en: "Why does it always rain when I'm free?", key: "Why does it always ~ when ~?", explanation: "「なんでいつも～の時に～なの？」嘆きや愚痴の自然なパターン。" },
            ]
        },
    ],
    "思うこと・考えること": [
        {
            ja: "明日は雨だと思う",
            ways: [
                { en: "I think it's going to rain tomorrow.", key: "I think ~", explanation: "「～だと思う」。自分の意見や予想を述べる最も基本的な形。" },
                { en: "It looks like it's going to rain tomorrow.", key: "It looks like ~", explanation: "「～みたいだ」。見た目や状況から判断した時に使う。" },
                { en: "It will probably rain tomorrow.", key: "probably", explanation: "「たぶん」。確信度70〜80%くらいの時に使う副詞。" },
            ]
        },
        {
            ja: "転職しようかなって考えてる",
            ways: [
                { en: "I'm thinking about changing jobs.", key: "I'm thinking about ~ing", explanation: "「～しようかと考えてる」。まだ決めてない検討中の状態を表す。" },
                { en: "I might look for a new job.", key: "I might ~", explanation: "「～するかも」。可能性を示す控えめな表現。" },
                { en: "I've been considering a career change.", key: "I've been considering ~", explanation: "「ずっと検討してきた」。しばらく考え続けているニュアンス。" },
            ]
        },
        {
            ja: "考えすぎかもしれないけど気になる",
            ways: [
                { en: "Maybe I'm overthinking it, but it bothers me.", key: "overthinking", explanation: "「考えすぎ」。over + 動詞で「やりすぎ」を表すパターン。" },
                { en: "I might be wrong, but something feels off.", key: "something feels off", explanation: "「何か違和感がある」。具体的に言えない時の便利な表現。" },
                { en: "I know it's small, but I can't stop thinking about it.", key: "I can't stop ~ing", explanation: "「～が止められない」。気になって仕方ない時に使う。" },
            ]
        },
    ],
    "ニュアンスを加える": [
        {
            ja: "一応傘持っていくね",
            ways: [
                { en: "I'll bring an umbrella just in case.", key: "just in case", explanation: "「念のため」。万が一に備える時の定番フレーズ。非常に使用頻度が高い。" },
                { en: "I'll take an umbrella to be safe.", key: "to be safe", explanation: "「安全のために」。リスクを避ける判断を伝える時に。" },
                { en: "I'd better bring an umbrella.", key: "I'd better ~", explanation: "「～した方がいい」。自分に対して「やるべきだ」と言う時に使う。" },
            ]
        },
        {
            ja: "せっかくの旅行だし楽しもう",
            ways: [
                { en: "We're here, so let's enjoy it.", key: "We're here, so ~", explanation: "「せっかく来たんだから」。状況を理由にポジティブに切り替える言い方。" },
                { en: "We might as well make the most of it.", key: "might as well ~", explanation: "「せっかくだから～しよう」。どうせなら、というニュアンス。" },
                { en: "Let's not waste this trip.", key: "Let's not waste ~", explanation: "「無駄にしないようにしよう」。もったいない気持ちを前向きに伝える。" },
            ]
        },
        {
            ja: "結局さ、自分で決めるしかないんだよね",
            ways: [
                { en: "At the end of the day, it's your decision.", key: "at the end of the day", explanation: "「結局のところ」。議論をまとめる時の定番フレーズ。" },
                { en: "Only you can decide.", key: "Only you can ~", explanation: "「あなたにしかできない」。相手に決断を委ねる時に。" },
                { en: "It comes down to what you want.", key: "it comes down to ~", explanation: "「結局～次第だ」。本質を突く時に使う表現。" },
            ]
        },
    ],
    "感想を伝える": [
        {
            ja: "この店のラーメンめっちゃうまい",
            ways: [
                { en: "The ramen here is really good.", key: "~ is really good", explanation: "「本当においしい」。最もシンプルで自然な褒め方。" },
                { en: "This is the best ramen I've ever had.", key: "the best ~ I've ever had", explanation: "「今まで食べた中で一番」。最上級 + 現在完了の強い褒め表現。" },
                { en: "You have to try the ramen here.", key: "You have to try ~", explanation: "「絶対食べてみて」。おすすめする時の熱い言い方。" },
            ]
        },
        {
            ja: "あの映画のラスト、ありえないよね",
            ways: [
                { en: "I can't believe how the movie ended.", key: "I can't believe how ~", explanation: "「～がどうだったか信じられない」。驚きの感想を伝える。" },
                { en: "I didn't see that ending coming.", key: "I didn't see ~ coming", explanation: "「～が来るとは思わなかった」。予想外の展開に使える便利な表現。" },
                { en: "The ending was so unexpected.", key: "unexpected", explanation: "「予想外の」。シンプルに驚きを伝える形容詞。" },
            ]
        },
        {
            ja: "この本おすすめ、人生変わるレベル",
            ways: [
                { en: "You should read this book. It changed my life.", key: "It changed my life", explanation: "「人生が変わった」。大げさだが英語では普通に使う強い推薦表現。" },
                { en: "This book is a must-read.", key: "a must-read", explanation: "「必読」。must + 名詞で「絶対すべきもの」。must-see（必見）も同じパターン。" },
                { en: "I highly recommend this book.", key: "I highly recommend ~", explanation: "「強くおすすめする」。フォーマルにも使える丁寧な推薦表現。" },
            ]
        },
    ],
    "相槌": [
        {
            ja: "へえ、そうなんだ",
            ways: [
                { en: "Oh, really?", key: "Oh, really?", explanation: "「へえ、そうなの？」最もシンプルな相槌。トーンで興味の度合いが変わる。" },
                { en: "I didn't know that.", key: "I didn't know that", explanation: "「知らなかった」。新しい情報を聞いた時の自然なリアクション。" },
                { en: "That's interesting.", key: "That's interesting", explanation: "「面白いね」。相手の話に興味を示す万能な相槌。" },
            ]
        },
        {
            ja: "それは大変だったね",
            ways: [
                { en: "That must have been tough.", key: "That must have been ~", explanation: "「～だったに違いない」。相手の過去の経験に共感する定番表現。" },
                { en: "That sounds really hard.", key: "That sounds ~", explanation: "「～そうだね」。聞いた話に対する感想を伝える形。" },
                { en: "I'm sorry to hear that.", key: "I'm sorry to hear that", explanation: "「それは残念だね」。悪い知らせへの定番リアクション。" },
            ]
        },
        {
            ja: "わかる、それな",
            ways: [
                { en: "I know what you mean.", key: "I know what you mean", explanation: "「言いたいことわかるよ」。相手の気持ちに共感する表現。" },
                { en: "I feel the same way.", key: "I feel the same way", explanation: "「同じ気持ちだよ」。共感を直接的に伝える。" },
                { en: "I totally agree.", key: "I totally agree", explanation: "「完全に同意」。totally で強調を加えた同意表現。" },
            ]
        },
    ],
    "相手の話を深堀する質問": [
        {
            ja: "それってどういうこと？",
            ways: [
                { en: "What do you mean by that?", key: "What do you mean by ~?", explanation: "「～ってどういう意味？」相手の発言を掘り下げる基本フレーズ。" },
                { en: "Can you explain a little more?", key: "Can you explain ~?", explanation: "「もう少し説明してくれる？」丁寧に詳細を求める言い方。" },
                { en: "Like what, for example?", key: "Like what?", explanation: "「例えばどんな？」具体例を聞く時のカジュアルな質問。" },
            ]
        },
        {
            ja: "きっかけは何だったの？",
            ways: [
                { en: "What made you decide to do that?", key: "What made you ~?", explanation: "「何があなたを～させたの？」動機や理由を聞く自然な形。" },
                { en: "How did you get into that?", key: "How did you get into ~?", explanation: "「どうやって～を始めたの？」趣味や仕事のきっかけを聞く定番。" },
                { en: "What was the reason?", key: "What was the reason?", explanation: "「理由は何だったの？」シンプルに原因を尋ねる。" },
            ]
        },
        {
            ja: "それで結局どうなったの？",
            ways: [
                { en: "So what happened in the end?", key: "in the end", explanation: "「結局」。話のオチや結果を聞く時に使う。finally との違いは、過程を経た結果を強調する点。" },
                { en: "How did it turn out?", key: "How did it turn out?", explanation: "「どうなった？」結果を聞く時の自然な表現。turn out = 結果的に～になる。" },
                { en: "And then what?", key: "And then what?", explanation: "「それで？」続きを促す短い質問。会話のテンポを保てる。" },
            ]
        },
    ],
    "話の切り出し": [
        {
            ja: "そういえば、聞いた？",
            ways: [
                { en: "By the way, did you hear about this?", key: "By the way", explanation: "「ところで」。話題を変える時の定番。略してBTWとも書く。" },
                { en: "Have you heard about this?", key: "Have you heard about ~?", explanation: "「～のこと聞いた？」ニュースや噂を共有する時の切り出し。" },
                { en: "Oh, that reminds me.", key: "That reminds me", explanation: "「あ、それで思い出した」。何かをきっかけに話題を出す自然な流れ。" },
            ]
        },
        {
            ja: "ねえ、ちょっと相談したいことあるんだけど",
            ways: [
                { en: "Can I ask you something?", key: "Can I ask you ~?", explanation: "「聞いてもいい？」相談の前置きとして一番使いやすい。" },
                { en: "I need your advice on something.", key: "I need your advice on ~", explanation: "「～についてアドバイスが欲しい」。相談を明確に切り出す表現。" },
                { en: "Do you have a minute? I want to talk.", key: "Do you have a minute?", explanation: "「ちょっと時間ある？」相手の都合を確認してから話す丁寧な切り出し。" },
            ]
        },
        {
            ja: "話変わるんだけどさ",
            ways: [
                { en: "Anyway, changing the subject...", key: "changing the subject", explanation: "「話題を変えるけど」。直接的だが正直な切り替え表現。" },
                { en: "This is random, but...", key: "This is random, but", explanation: "「急だけど」。脈絡なく話題を出す時のカジュアルな前置き。" },
                { en: "Oh, I just thought of something.", key: "I just thought of ~", explanation: "「あ、今ふと思ったんだけど」。自然に話題を切り替えるテクニック。" },
            ]
        },
    ],
};

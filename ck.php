<?php
$probeFile = 'probes.txt';
$id = isset($_GET['id']) ? $_GET['id'] : null;
if ($id !== null) {
    if (file_exists($probeFile)) {
        $content = file_get_contents($probeFile);
        preg_match_all("/$id;([^;]+);([^;]+)/", $content, $matches, PREG_SET_ORDER);
        if (!empty($matches)) {
            foreach ($matches as $match) {
                list(, $ip, $time) = $match;
                echo "(IP: $ip)";
            }
        } else {
            http_response_code(404);
            echo "找不到ID数据 '$id'.";
        }
    } else {
        http_response_code(500);
        echo "没有找到获取的文件";
    }
} else {
    http_response_code(400);
    echo "请使用参数查看";
}
?>
<?php

$probeFile = 'probes.txt';

$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id !== null) {
    
    $ip = $_SERVER['REMOTE_ADDR'];
  
    $time = date('Y-m-d H:i:s');
    
    $data = "$id;$ip;$time\n";

    file_put_contents($probeFile, $data, FILE_APPEND);

    header('Content-Type: text/html; charset=utf-8');
    echo <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=https://baidu.com">
</head>
<body>
    <p>'$id'</p>
</body>
</html>
HTML;
} else {

    http_response_code(400);
    echo "没有提供ID或者参数";
}
?>
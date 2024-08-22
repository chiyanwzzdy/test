<?php

$probeFile = 'probes.txt';

$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id !== null) {
   
    $ip = $_SERVER['REMOTE_ADDR'];

    $time = date('Y-m-d H:i:s');

    $data = "$id;$ip;$time\n";

    file_put_contents($probeFile, $data, FILE_APPEND);

    echo "Probe data for ID '$id' has been recorded.";
} else {

    http_response_code(400);
    echo "没有提供ID";
}
?>
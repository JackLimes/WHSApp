
<?php
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    }
    exit;
}

$json = file_get_contents('php://input');
$obj = json_decode($json);
$obj->fillme = "Sex";

$response = json_encode($obj);

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo $response;

// get the q parameter from URL
//$q = $_REQUEST["q"];

//echo $q;
?> 
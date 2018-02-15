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
    
    $servername = "localhost";
    $username = "fooUser";
    $password = "pass";
    $database = "test_ann";
    $mysqli = new mysqli($servername, $username, $password, $database);
    $response = "";

    // Check connection
    if (mysqli_connect_errno($mysqli)) {
        $response .= "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    // create the escape strings

    $obj->title = mysqli_real_escape_string($mysqli, $obj->title);
    $obj->club = mysqli_real_escape_string($mysqli, $obj->club);
    $obj->description = mysqli_real_escape_string($mysqli, $obj->description);
    $obj->birth = mysqli_real_escape_string($mysqli, $obj->birth);

    //make the query
    $sql = "INSERT INTO announcement (title, club, description, birth, color, clubid) VALUES('$obj->title', '$obj->club', '$obj->description', '$obj->birth', '$obj->color', '$obj->clubid')";
    if(!$mysqli->query($sql)) { //assing the result
        //query failed
        $response .= "The query failed" . $mysqli->error;
    } else {
        $response .= "The query worked! Successfully posted!";
    }
    
    header('Content-type: application/json');
    header('Access-Control-Allow-Origin: *');

    echo json_encode($response);
    $mysqli->close();
?>
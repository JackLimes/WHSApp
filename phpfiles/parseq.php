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
    
    $q = $obj->indat;
    $response = json_encode($obj->indat);
    
    

    $servername = "localhost";
    $username = "fooUser";
    $password = "pass";
    $database = "test_ann";
    $mysqli = new mysqli($servername, $username, $password, $database);

    // Check connection
    if (mysqli_connect_errno($mysqli)) {
        //echo "Failed to connect to MySQL: " . mysqli_connect_error();
    } else {
        //echo "Connected successfully<br>";
    }



    //make the query
    $sql = "SELECT * FROM announcement WHERE club = '" . $q . "'";
    if(!$result = $mysqli->query($sql)) { //assing the result
        //query failed
        //echo "The query failed";
    }

    
    
    
    $resobj = new stdClass(); //make object to put data in.
    //inialize array objects
    $resobj->title = array();
    $resobj->club = array();
    $resobj->desc = array();
    $resobj->birth = array();
    
    while($row = $result->fetch_assoc()) {
        array_Push($resobj->title, $row['title']);
        array_push($resobj->club, $row['club']);
        array_push($resobj->desc, $row['description']);
        array_push($resobj->birth, $row['birth']);
    }
    //$finalres = json_encode($response);
    //header('Content-type: application/json');
    //header('Access-Control-Allow-Origin: *');
    //echo $finalres;
    
    header('Content-type: application/json');
    header('Access-Control-Allow-Origin: *');

    echo json_encode($resobj);
    $result->free();
    $mysqli->close();


?>

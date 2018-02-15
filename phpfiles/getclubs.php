<?php
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST') {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
        }
        exit;
    }
    
    //$json = file_get_contents('php://input');
    //$obj = json_decode($json);
    
    //$q = $obj->indat;
    //$response = json_encode($obj->indat);
    
    

    $servername = "localhost";
    $username = "fooUser";
    $password = "pass";
    $database = "test_ann";
    $mysqli = new mysqli($servername, $username, $password, $database);

    // Check connection
    if (mysqli_connect_errno($mysqli)) {
        $resobj->err .=  "Failed to connect to MySQL: " . mysqli_connect_error();
    } else {
        //echo "Connected successfully<br>";
    }



    //make the query
    //get ALL THE DATA for now.
    $sql = "SELECT name, color, id, description from clubs ORDER BY name";
    if(!$result = $mysqli->query($sql)) { //assing the result
        //query failed
        $resobj->err .= "The query failed";
    }

    
    
    
    $resobj = new stdClass(); //make object to put data in.
    //inialize array objects
    $resobj->name = array();
    $resobj->color = array();
    $resobj->id = array();
    $resobj->desc = array();
    
    while($row = $result->fetch_assoc()) {
        array_Push($resobj->name, $row['name']);
        array_push($resobj->color, $row['color']);
        array_push($resobj->id, $row['id']);
        array_push($resobj->desc, $row['description']);
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

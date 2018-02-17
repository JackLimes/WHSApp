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

    $username = "id4761871_fzwadmin";

    $password = "fzwadmin123!";

    $database = "id4761871_fzwestboard";

    $mysqli = new mysqli($servername, $username, $password, $database);


    // Check connection

    if (mysqli_connect_errno($mysqli)) {

        //echo "Failed to connect to MySQL: " . mysqli_connect_error();

    } else {

        //echo "Connected successfully<br>";

    }
	
	$sql = "SELECT clubid FROM subscriptions WHERE uid = '$obj->uid'";
	$result = $mysqli->query($sql);
	
	$clubarray = array();
	
	while($row = $result->fetch_assoc()) {
        array_Push($clubarray, $row['clubid']);

    }
	
	header('Content-type: application/json');

    header('Access-Control-Allow-Origin: *');



    echo json_encode($resobj);

    $result->free();

    $mysqli->close();


	?>
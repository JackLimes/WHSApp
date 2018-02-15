<html>
<head><title>Addition php</title></head>
<body>

<?php
  	# operator
    print "<h2>php program to add connect to mysql</h2><br />";
    
    $servername = "localhost";
    $username = "fooUser";
    $password = "pass";
    $database = "test_ann";
    $mysqli = new mysqli($servername, $username, $password, $database);

    // Check connection
    if (mysqli_connect_errno($mysqli)) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    } else {
        echo "Connected successfully<br>";
    }

    //make the query
    $sql = "SELECT * FROM announcement";
    if(!$result = $mysqli->query($sql)) { //assing the result
        //query failed
        echo "The query failed";
    }

    while($row = $result->fetch_assoc()) {
        echo "Title: " . $row['title'] . "<br>";
        echo "Club: " . $row['club'] . "<br>";
        echo "Description: " . $row['description'] . "<br>";
        echo "Birth: " . $row['birth'] . "<br>";
    }

    
    
    $result->free();
    $mysqli->close();


?>
<!--
<br>Also hi Brighton!
<img src="/phpfiles/Warning.png"/>
<img src="/phpfiles/10j0m.jpg"/>
<img src="/phpfiles/10keg.png"/>
<img src="/phpfiles/552258.png"/>
<img src="/phpfiles/770497.png"/>
<img src="/phpfiles/1493099044645.jpg"/>
<img src="/phpfiles/1509717266542.png"/>
<img src="/phpfiles/1516000584358.jpg"/>
<img src="/phpfiles/1516001021948.jpg"/>
<img src="/phpfiles/i8bcoAa.jpg"/>
-->
<img src="/phpfiles/tumblr_lvhyu6jj2b1qixmfdo1_500.jpg"/>
These are the only nipples you will find here!
</body>
</html>
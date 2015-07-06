<?php

$con=mysql_connect('localhost','root','');
mysql_select_db("credentials",$con);

mysql_query("insert into info(id, name, location,other) values ('{$id}','{$name}','{$location}'),'{$other}'");


?>
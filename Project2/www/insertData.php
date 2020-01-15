<?php include "./inc/dbinfo.inc";

$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

$database = mysqli_select_db($connection, DB_DATABASE);

VerifyPlayTable($connection, DB_DATABASE);
VerifyBeforeTable($connection, DB_DATABASE);
VerifyAfterTable($connection, DB_DATABASE);

$play = $_POST['play'];
$before = $_POST['before'];
$after = $_POST['after'];

InsertIntoPlay($connection, $play);
InsertIntoBefore($connection, $before);
InsertIntoAfter($connection, $after);

$result = mysqli_query($connection, "SELECT * FROM play");

mysqli_free_result($result);
mysqli_close($connection);

function TableExists($tableName, $connection, $dbName) {
    $t = mysqli_real_escape_string($connection, $tableName);
    $d = mysqli_real_escape_string($connection, $dbName);

    $checktable = mysqli_query($connection,
        "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = '$t' AND TABLE_SCHEMA = '$d'");

    if(mysqli_num_rows($checktable) > 0) return true;

    return false;
}

function VerifyPlayTable($connection, $dbName) {
    if(!TableExists("play", $connection, $dbName))
    {
        $query = "CREATE TABLE play (
         TURN int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
         CARDS VARCHAR(45)
       )";

        if(!mysqli_query($connection, $query)) echo("<p>Error creating play table.</p>");
    }
}

function VerifyBeforeTable($connection, $dbName) {
    if(!TableExists("before", $connection, $dbName))
    {
        $query = "CREATE TABLE before (
         TURN int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
         HAND VARCHAR(45)
       )";

        if(!mysqli_query($connection, $query)) echo("<p>Error creating before table.</p>");
    }
}

function VerifyAfterTable($connection, $dbName) {
    if(!TableExists("after", $connection, $dbName))
    {
        $query = "CREATE TABLE after (
         TURN int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
         HAND VARCHAR(45)
       )";

        if(!mysqli_query($connection, $query)) echo("<p>Error creating after table.</p>");
    }
}

function InsertIntoPlay($connection, $play)
{
    $n = mysqli_real_escape_string($connection, $play);

    $query = "INSERT INTO play (CARDS) VALUES ('$n');";
    if(!mysqli_query($connection, $query)) echo("<p>Error adding played data.</p>");
}

function InsertIntoBefore($connection, $hand)
{
    $n = mysqli_real_escape_string($connection, $hand);

    $query = "INSERT INTO before (HAND) VALUES ('$n');";
    if(!mysqli_query($connection, $query)) echo("<p>Error adding card before hand data.</p>");
}

function InsertIntoAfter($connection, $hand)
{
    $n = mysqli_real_escape_string($connection, $hand);

    $query = "INSERT INTO after (HAND) VALUES ('$n');";
    if(!mysqli_query($connection, $query)) echo("<p>Error adding card after hand data.</p>");
}

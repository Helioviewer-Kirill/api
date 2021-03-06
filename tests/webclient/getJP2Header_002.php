<?php
include_once __DIR__.'/../../tests/test_header.php';

include_once __DIR__.'/../../src/Module/WebClient.php';
include_once __DIR__.'/../../src/Validation/InputValidator.php';

$params = array(
    'action'   => 'getJP2Header',
    'id'       => '7654321',
    'callback' => 'callbackTest'
);

echo "\n\nInput to test case:\n";
echo '$params => ';
var_dump($params);

echo "\nInitializing Object";
$webClient = new Module_WebClient($params);

echo "\n\nExecuting API call:\n";
echo '$webClient->execute()'."\n";

echo "\nActual Test Output:\n";
$webClient->execute();

include_once __DIR__.'/../../tests/test_footer.php';
?>
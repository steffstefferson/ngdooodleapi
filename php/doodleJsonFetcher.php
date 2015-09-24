
<?php
 header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');


$regEx = "/^([a-z]|[0-9]){16}$/"; 
$str = "bdtc2fehhwifrf32";
$debug = false;
if(isset($_GET["keyOfPoll"])){
	$str = $_GET["keyOfPoll"];
}
if(isset($_GET["debug"])){
	$debug = true;
}
if(preg_match($regEx, $str, $matches)){
  $html = file_get_contents('http://doodle.com/'.$str);
  
  $posStart = strpos($html,"\"poll\":")-1;
  $posEnd = strpos($html,"doodleJS.data.poll.keywordsJson");
  $posEnd = strpos($html,");",$posEnd-30);

  if($posStart === false || $posEnd === false || $posStart > $posEnd || $debug === true)
	{
		echo "could not locate json in html file: posStart ".$posStart." posEnd:".$posEnd;
		echo $html;
	} else {		  
		$json = substr($html,$posStart,$posEnd-$posStart); 
		echo $json;
	}
}else{
  echo 'invalid doodle code';
}
?>

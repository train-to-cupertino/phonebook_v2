<?php
set_time_limit(600);
/*
$xmlResponse = file_get_contents("https://geocode-maps.yandex.ru/1.x/?geocode=38.975926841545,45.019429413629");
echo "<xmp>".$xmlResponse."</xmp>";
	$dom = new domDocument;
	$dom->loadXML($xmlResponse);
	$s = simplexml_import_dom($dom);
	$x = $s->GeoObjectCollection[0]->featureMember[0]->GeoObject[0]->metaDataProperty[0]->GeocoderMetaData[0]->Address[0]->formatted[0]->__toString();
	var_dump($x);
return;
*/

/*
function getAddress($coords) {
	$coords = explode(",", $coords);
	$coords = $coords[1].",".$coords[0];
	
	$xmlResponse = file_get_contents("https://geocode-maps.yandex.ru/1.x/?geocode=".$coords);
	//echo $xmlResponse;
	//return;
	
	$dom = new domDocument;
	$dom->loadXML($xmlResponse);
	if (!$dom) {
	   echo 'Error while parsing the document';
	   exit;
	}
	 
	$s = simplexml_import_dom($dom);
	 
	$res = $s->GeoObjectCollection[0]->featureMember[0]->GeoObject[0]->metaDataProperty[0]->GeocoderMetaData[0]->Address[0]->formatted[0]->__toString();
	//echo $res;
	return $res;
}
*/

//echo getAddress("45.019429413629,38.975926841545");

$data = json_decode(file_get_contents('data.json'), 1);

/*
$start = 0;
$end = 600;
$c = 0;
*/
foreach($data["ITEMS"] as $key => $val) {
	unset($data["ITEMS"][$key]["OLDCOORDS"]);
	/*
	$address = $data["ITEMS"][$key]["ADDR"];
	$data["ITEMS"][$key]["ADDRESS"] = $address;
	unset($data["ITEMS"][$key]["ADDR"]);
	*/
	/*
	if (($c < $start) || ($c >= $end)) {
		$c++;
		continue;
	}
	
	//continue;
	//unset($data["ITEMS"][$key]["DETAILURL"]);

	$address = getAddress($data["ITEMS"][$key]["COORDS"]);
	$data["ITEMS"][$key]["ADDR"] = $address;
	
	unset($data["ITEMS"][$key]["ADDR_WITHOUT_PREFIX"]);
	
	$c++;
	*/
}

var_dump($data);
file_put_contents('data'.time().'.json', json_encode($data));
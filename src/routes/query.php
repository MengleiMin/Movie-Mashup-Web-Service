<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;


//get all customers

$app->get('/movies/{moviename}',function(Request $request, Response $response){
	$moviename=$request->getAttribute('moviename');
	$url = "http://api.themoviedb.org/3/search/movie?api_key=5be60c7ee70a9a26acdd6ab845357d3b&language=en-US&query=".$moviename."&include_adult=false";
	$html = file_get_contents($url); 
    return $response->withRedirect($url, 301);
    
}
);


$app->get('/wiki/{searchword}',function(Request $request, Response $response){
	$searchword=$request->getAttribute('searchword');
	$url = "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=".$searchword."&callback=?";
	$html = file_get_contents($url); 
	return $response->withRedirect($url, 301);
}
  );


	
?>
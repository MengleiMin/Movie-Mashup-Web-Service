$('.modalDialog').hide();
 $(".modalDialog div").html("");
var wikitext;
var movieid;
var youtubeid;
var tralierurl;

$('.slide').on('click', 'h3', function(){
	$('.modalDialog').slideDown();
	//$('.modalDialog div').html("<br><br><b>༼ つ ͠° ͟ ͟ʖ ͡° ༽つ Movie not famous enough for wiki article. Click anywhere to close.</b>");
	var searchWord = $(this).text();
	console.log(searchWord);
  
	var baseurlmovie='http://api.themoviedb.org/3/search/movie?api_key=753d90e25748af01258588027b1fefb7&language=en-US&query="';
	var querymovie = baseurlmovie+searchWord;
	$.ajax({
		url: querymovie,
		async: false,
		contentType: "json; charset=utf-8",
		success: function (result) {
		    getmovieid(result);
		}
	});
 
//////////////////////////////////////////////////////////////////////
  //  setTimeout(500);
	var newurl='http:localhost/slim/public/index.php/wiki/';
	var baseurlwiki='http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=';
	var callbackwiki='&callback=?';
	var querywiki = baseurlwiki+searchWord+callbackwiki;
	$.ajax({
		type: "GET",
		url: querywiki,
		contentType: "json; charset=utf-8",
		async: false,
		dataType: "json",
		success: function (data) {
			getWiki(data);
		}
	});
	
});

function getmovieid(result){
	console.log(result);
	//alert(result.results[0].id)
	movieid = result.results[0].id;
	var urlvideoid= 'https://api.themoviedb.org/3/movie/'+movieid+'/videos?api_key=753d90e25748af01258588027b1fefb7&language=en-US';
	$.ajax({
		url: urlvideoid,
		async: false,
		contentType: "json; charset=utf-8",
		success: function (result_youtube) {
		    getyoutubeid(result_youtube);
		}
	});
}

function getyoutubeid(result){
	console.log(result);
	//alert(result.results[0].key);
	youtubeid = result.results[0].key;
	tralierurl = 'https://youtube.com/embed/'+youtubeid;
	//alert(tralierurl);
	//display();

}

function getWiki(data){
	
	var tralier = "<iframe width='560' height='315' src='"+tralierurl+"' frameborder='0' allow='accelerometer; autoplay;sencrypted-media; gyroscope; picture-in-picture'' allowfullscreen></iframe>";
	
	//alert(tralier);
	//var movietext = "<iframe style=' margin: 0 auto;' width='560' height='315' src='https://www.youtube.com/embed/xdHx1YEsWwk' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br><br><br>";
    if(youtubeid!=""){
    	wikitext = $(".modalDialog div").html("<h2 style='overflow:auto;' class='title'>About the movie</h2>"+tralier+data.parse.text['*']);
    	$(wikitext).find('p'); //searching for text content from Wikipedia, that is, p-tags
		$(wikitext).find('a').each(function() {	//removed will remove all links because they are not working in this API.
			$(this).replaceWith($(this).html()); 
		});
		$(wikitext).find('sup').remove(); //delete the references
		$(wikitext).find('.mw-ext-cite-error').remove(); //remove the quotation marks
    //var movietext = "<iframe width='560' height='815' src='https://www.youtube.com/embed/xdHx1YEsWwk' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br><br><br>";
	//$(".modalDialog div").html($(movietext));
		$(".modalDialog div").html($(wikitext).find('p, h2, iframe'));
	}else{
		wikitext = $(".modalDialog div").html("<h2 align=’center‘ style='overflow:auto;' class='title'>About the movie</h2> <b>Movie not famous enough for Any tralier.</b>"+data.parse.text['*']);
	}
   // alert($(wikitext));
	
}

$('.modalDialog').click(function(){
	$(this).slideUp();
 $(".modalDialog div").html("");
});



 
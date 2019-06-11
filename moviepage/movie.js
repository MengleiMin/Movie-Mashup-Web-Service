function getBooks(){

	$('li').remove();
	
	var searchWord = $('.field').val();
	var newurl='http:localhost/slim/public/index.php/movies/';
	var baseurl='https://api.themoviedb.org/3/movie/550?api_key=753d90e25748af01258588027b1fefb7&language=en-US&query="';
	var query = baseurl+searchWord;

	//var query = "https://api.themoviedb.org/3/search/movie?api_key=5be60c7ee70a9a26acdd6ab845357d3b&language=en-US&query="+searchWord+"&include_adult=false';

	$.ajax({
		url: query,
		async: true,
		dataType: "jsonp",
		success: function (result) {
			console.log(result);
			ajax.parseJSONP(result);
		}
	});
	
	$('#container').delay(100).fadeOut(500, function(){
		$(this).remove();
	});
	$('.deck-container').delay(600).fadeIn();
	$('header').delay(1000).fadeIn();
	$('#footer, #left, #right').delay(5000).fadeIn(500);
	
}

var ajax = {

	parseJSONP : function(result) {
		
		var sections = $('.slide');
		var perSection = Math.ceil(27 / sections.length); 
			
		$.each(result.results, function(i, row) {
		
			var secNo = Math.floor(i / perSection); 
				
			function anim(){
			
				$('.slide:eq("' + secNo + '")').append
				(
				'<li><table class="books"><tr><td>' +
				'<a href="' +'https://image.tmdb.org/t/p/w500' + row.backdrop_path + '" target="_blank">' +
				'<img src='+'https://image.tmdb.org/t/p/w500' + row.poster_path +'></a></td><td>' +
				'<a href="#openModal"><h3>' + row.title + '</h3></a>' +
				'<h1>' +row.release_date + '</h1>' +
				'<h1>' +row.release_date + '</h1>' +
				'<h1>' +row.key + '</h1>' +
				'</td><tr></table></li>'
				);
				
				$('li').each(function(index) {
					$(this).delay(250*index).animate({
						opacity: 1
					});
				});
			}
			setTimeout(anim, 800);
			
		});
		
	}
	
};





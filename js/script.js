
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
	var $button = $('#submit-btn');
	var streetStr = $('#street').val();
	var cityStr = $('#city').val();
	var address = streetStr + ', ' + cityStr;

	var addressURL = `http://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address}`;
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	  'api-key': "7f0f1a26728d4d1db90c5f31f4e2a148",
	  'q': address
	});
	
	$body.append('<img class="bgimg" src="'+addressURL+'">');
	
	$greeting.text('So you want to live at '+address+'?');
	
	var nytimes = "https://www.nytimes.com/";
	
	//http://developer.nytimes.com/article_search_v2.json
	$.getJSON(url, function(data){
		$.each(data.response.docs, function(i, item){
			$nytElem.append('<li class="article"><a href="'+item.web_url+'">'+item.headline.main+'</a><p>'+item.snippet+'</p></li>');
		});
		console.log(data.response.docs);
	});
	



	//
	
	return false;
};

$('#form-container').submit(loadData);

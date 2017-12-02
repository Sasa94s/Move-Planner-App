
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
	var $button = $('#submit-btn');
	var streetStr = $('#street').val();
	var cityStr = $('#city').val();
	var address = streetStr + ', ' + cityStr;

	var addressURL = `http://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address}`;
	
	$body.append('<img class="bgimg" src="'+addressURL+'">');
	
	$greeting.text('So you want to live at '+address+'?');
	
	// load ny data
	var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	nytURL += '?' + $.param({
	  'api-key': "7f0f1a26728d4d1db90c5f31f4e2a148",
	  'q': cityStr
	});
	
	$.getJSON(nytURL, function(data){
		$('#nytimes-header').text('New York Times Articles About '+cityStr);
		$.each(data.response.docs, function(i, item){
			$nytElem.append('<li class="article"><a href="'+item.web_url+'">'+item.headline.main+'</a><p>'+item.snippet+'</p></li>');
		})
	})
	.fail(function() {
		$('#nytimes-header').text('New York Times Articles Coult Not Be Loaded');
	});
	
	
	// load wiki data
	var wikiURL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${cityStr}&format=json&callback=wikiCallback`;
	$.ajax({
		url: wikiURL,
		dataType: "jsonp",
		success: function(response) {
			//console.log(response);
			//console.log(response[1].length);
			for(var i = 0; i < response[1].length; i++) {
				$wikiElem.append(`<li class="article"><a href="${response[3][i]}">${response[1][i]}</a><p>${response[2][i]}</p></li>`);
			}
		}
	});
	
	return false;
};

$('#form-container').submit(loadData);

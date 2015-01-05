$(function() {

	var apiKey = "gctmf4efq2wpj5c5q5z5hsca";
	var resultsArea = $(".kloutapp-results"); // get results area
	var kloutId = "";

	// display 'empty' layouts
	var loadDefaultLayouts = function() {
		// load it
		var boxes = $(".kloutapp-results .results-box");
		$.each(boxes, function(){
			var emptyLayout = $(".template .results-empty").clone();
			$(this).append(emptyLayout);
		});
	};
	// init 'empty' layouts
	loadDefaultLayouts();





	$("button").on("click",function(event) {
		event.preventDefault();
		var current = $(this).parents(".results-box");
		// grab tw handle
		var twHandle = current.find("input").val();
		displayData(current,twHandle);
	});

	$(".close-btn").on("click",function() {
		// remove user and default back to 'empty' layout
	});







	var displayData = function(current,handle) {
		// get user & load into layout
		var request = {
			screenName:handle,
			key:apiKey
		};

		var result = $.ajax({
			url: "http://api.klout.com/v2/identity.json/twitter/",
			data: request,
			dataType: "jsonp",
			type: "GET",
		})
		.done(function(result){
			var kloutId = result.id;
			// clear error message... $(".error-messages").hide().find("p").text("");
			
			current.empty();
			var enteredLayout = $(".template .results-entered").clone();

			var handleHref = enteredLayout.find(".results-header p > a");
			var handleName = enteredLayout.find(".results-header p");
			handleName.attr("href","http://www.klout.com/"+kloutId);
			handleName.text("@"+handle);

			current.append(enteredLayout);

			getScore(current,kloutId);

		})
		.fail(function(jqXHR, error, errorThrown){

			// $(".error-messages").show().find("p").append(errorElem);
		});
	};



	var getScore = function(current,kloutId) {
		// get score & load into layout
		console.log("get score");
		console.log(current);
		console.log(kloutId);
	};



	// get topics & load into layout
	//console.log("get topics");



});
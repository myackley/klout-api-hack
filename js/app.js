$(function() {

	var apiKey = "gctmf4efq2wpj5c5q5z5hsca";

	// display 'empty' layouts
	var loadDefaultLayouts = function() {
		// get results area
		var resultsArea = $(".kloutapp-results");
		// load it
		for (i=0;i<2;i++) {
			var emptyLayout = $(".template .results-empty").clone();
			resultsArea.append(emptyLayout);
		}
	};

	// init 'empty' layouts
	loadDefaultLayouts();

	$("button").on("click",function(event) {
		event.preventDefault();
		// var current = $(this).parents(".results-empty");
		// grab tw handle
		var twHandle = $("input[type='text'").val();
		displayData(twHandle);
	});

	$(".close-btn").on("click",function() {
		// remove user and default back to 'empty' layout
	});

	var displayData = function(handle) {
		// get user & load into layout
		getUser(handle);
		// get score & load into layout
		console.log("get score");		
		// get topics & load into layout
		console.log("get topics");
	};

	var getUser = function(handle) {
		console.log("get user"+handle);
	};

});
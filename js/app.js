$(function() {

	var apiKey = "gctmf4efq2wpj5c5q5z5hsca";
	var resultsArea = $(".kloutapp-results"); // get results area
	var kloutId = "";
	var current = "";

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

	$(".results-box").on("click",".close-btn",function(event) {
		event.preventDefault();
		// remove user and default back to 'empty' layout
		var current = $(this).parents(".results-box");
		var emptyLayout = $(".template .results-empty").clone()
		current.empty().append(emptyLayout);
	});







	var displayData = function(current,handle) {
		// get user & load into layout

		$.ajax({
			url: "http://api.klout.com/v2/identity.json/twitter/",
			data: {screenName:handle,key:apiKey},
			dataType: "jsonp",
			type: "GET",
			success: function(result) {
				var kloutId = result.id;
				// clear error messages
				$(".error-messages").find("p").text("").hide();
				// empty the 'box'
				current.empty();
				var enteredLayout = $(".template .results-entered").clone();
				// load up the handle
				var handleHref = enteredLayout.find(".results-header p > a");
				var handleName = enteredLayout.find(".results-header p");
				handleName.attr("href","http://www.klout.com/"+kloutId);
				handleName.text("@"+handle);
				current.append(enteredLayout);

				getScore(current,kloutId);
				getTopics(current,kloutId);
			},
			error: function() {
				$(".error-messages").show().find("p").append("User does not exist. Try another username.");
			}
		});
	};



	var getScore = function(current,kloutId) {
		// get score & load into layout
		$.ajax({
			url: "http://api.klout.com/v2/user.json/"+kloutId+"/score",
			data: {key:apiKey},
			dataType: "jsonp",
			type: "GET",
			success: function(result) {
				current.find(".results-score div p").text(Math.round(result.score));	
			},
			error: function() {
				$(".error-messages").show().find("p").append("User does not exist. Try another username.");
			}
		});
	};


	// get topics & load into layout
	var getTopics = function(current,kloutId) {
		console.log("get topics");
		
	}



});
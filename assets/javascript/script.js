
$(document).ready(function() {

var foodButtons = ["bananas", "donuts", "cookies", "popsicle"];
var foodInput = $("#food-input").val().trim();
var foodButton = $("<button>");

function grabGifs(){

	// This grabs the JSONs from the Giphy API
	var food = $(this).attr("data-food");
	var api_key = "I9dxUbm63Srw9v21MmcOU9oiTpqWV06l";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=" + api_key + "&limit=10";
	console.log(queryURL);
	$.ajax({
	    url: queryURL,
	    method: "GET",
	}).done(function(response) {
		var results = response.data;
	    console.log(results)

	// This displays the gifs, stills, and rating info
	for (var i = 0; i < results.length; i++) {

    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("rated " + rating);
		var foodImage = $("<img>");
        foodImage.attr("src", results[i].images.fixed_height_still.url);
        foodImage.attr("data-animate", results[i].images.fixed_height.url);
        foodImage.attr("data-still", results[i].images.fixed_height_still.url);
        foodImage.attr("data-state", "still");
        foodImage.attr("class", "gif-animate")
        gifDiv.append(p);
        gifDiv.append(foodImage);
        $("#food-gifs").prepend(gifDiv);
      
    };

	};
	
	});
};

// Displays initial buttons
$.each(foodButtons, function(index, value) {
		foodButton = $("<button>");
		$("#gif-buttons").append(foodButton.text(value));
		$(foodButton).attr("class", "food-button btn btn-info");
		$(foodButton).attr("data-food", this);

	});

//Displays new button when one is sumbitted in form

$("#food-submit").on("click", function() {
		
		event.preventDefault();
		foodInput = $("#food-input").val().trim();
		foodButtons.push(foodInput);
		console.log(foodInput);
		console.log(foodButtons);

		foodButton = $("<button>");
		$("#gif-buttons").append(foodButton.text(foodInput));
		$(foodButton).attr("class", "food-button");
		$(foodButton).attr("data-food", foodInput);
		$("#food-input").val("");
		$(".food-button").on("click", grabGifs)


	});

// Grabs gifs when food button is clicked on
$(document).on("click", ".food-button", grabGifs);

// Function to animate gif 
$(document).on("click", ".gif-animate", function() {
      var state = $(this).attr("data-state");
      console.log(state);
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

});	

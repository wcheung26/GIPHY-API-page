var topics = ["san francisco","hong kong","new york","vancouver","tokyo","honolulu","london","sydney","cape horn","dubai"];

function renderButtons() {
	var tempDiv = $("<div>")
	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button class='cityButton'>");
		newButton.attr("data-name",topics[i]);
		newButton.text(topics[i]);
		tempDiv.append(newButton);
	}
	$('#buttonsDiv').html(tempDiv);

};
renderButtons();

$("#submit").on('click',function(e) {
	e.preventDefault();
	topics.push($('#entry').val());
	renderButtons();
})

$(document).on('click',".cityButton",function() {
	var city = $(this).attr("data-name")
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		var result = response.data;
		for (var i = 0; i < result.length; i++) {
			var newDiv = $("<div class='block'>");
			
			var rating = $("<p>").text("Rating: " + result[i].rating);

			newDiv.append(rating);

			var newGIF = $("<img class='gif'>");
			newGIF.attr("src", result[i].images.fixed_height_still.url);
			newGIF.attr("data-animate", result[i].images.fixed_height.url);
			newGIF.attr("data-still", result[i].images.fixed_height_still.url);
			newDiv.append(newGIF);
			$('#display').prepend(newDiv);
		}

	});
});

$(document).on('click', '.gif', function() {
	if ($(this).attr("src") === $(this).attr('data-still')) {
		$(this).attr("src", $(this).attr("data-animate"));
	} else {
		$(this).attr("src", $(this).attr("data-still"));
	}
})


// //
// var person = $(this).attr("data-person");
//       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
//         person + "&api_key=dc6zaTOxFJmzC&limit=10";

//       $.ajax({
//           url: queryURL,
//           method: "GET"
//         })
//         .done(function(response) {
//           var results = response.data;

//           for (var i = 0; i < results.length; i++) {
//             var gifDiv = $("<div class='item'>");

//             var rating = results[i].rating;

//             var p = $("<p>").text("Rating: " + rating);

//             var personImage = $("<img>");
//             personImage.attr("src", results[i].images.fixed_height.url);

//             gifDiv.prepend(p);
//             gifDiv.prepend(personImage);

//             $("#gifs-appear-here").prepend(gifDiv);
//           }
//         });
$( document ).ready(function() {

var sportsActions = ["Basketball", "Baseball", "Football", "Hockey", "Tennis", "Soccer"];

function sportsActionButtons(){
    $("#giftyButtons").empty(); 
    for (var i = 0; i < sportsActions.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", sportsActions[i]);
        gifButton.text(sportsActions[i]);
        $("#giftyButtons").append(gifButton);
    }
}

function newButton(){
    $("#addGifty").on("click", function(){
    var action = $("#action-input").val().trim();
    if (action == ""){
      return false; 
    }
    sportsActions.push(action);

    sportsActionButtons();
    return false;
    });
}

function showGiftys(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=AbJjUoXcvcLwcj2ypFg1ZQ6oN9bdR2oj";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        $("#gifsView").empty(); 
        var inputResults = response.data; 
        if (inputResults == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<inputResults.length; i++){

            var gifDiv = $("<span>"); 
            gifDiv.addClass("gifDiv");
           
            var gifImage = $("<img>");
            gifImage.attr("src", inputResults[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",inputResults[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",inputResults[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsView").prepend(gifDiv);
        }
    });
}

sportsActionButtons(); 
newButton();

$(document).on("click", ".action", showGiftys);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});

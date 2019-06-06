
//define global


var submit = $('#submit');
var textInput = $('#text-input');
var output = $('#gifs');

var linkbuilder = function(string){
    return `https://api.giphy.com/v1/gifs/search?api_key=7NCgQNu9PIxYnwBdzXkXtF9OLJEuaVd3&q=${string}&limit=1&offset=0&rating=PG&lang=en`
}

var renderNewGif = function(input){
    let inputId = input.id
    let newDiv = $("<div>").attr('class', "col-sm-6 col-lg-3").attr("data", inputId).attr('data-loop', input.images.looping.mp4).attr('data-static', input.images.fixed_height.mp4);
    let img = $('<img>').attr('src', input.images.fixed_height.url).attr("data", inputId).attr('data-loop', input.images.looping.mp4).attr('data-static', input.images.fixed_height.mp4);
    newDiv.append(img);
    output.append(newDiv);

}

var getGif = function(string){
    
    $.ajax({
        url: linkbuilder(string),
        method: "GET"
    }).then(function (response) {
        console.log(response.data[0]);
        renderNewGif(response.data[0]);
    });

}



$(document).on("click", "#submit", function(){
    console.log('clicked submit');
    let val = textInput.val();
    getGif(val);



});

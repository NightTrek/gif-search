//define global
var submit = $('#submit');
var textInput = $('#text-input');
var gifArray = [];
var deletionNumber = 0;
//GIFs are objects which have a newDiv img and ID they have functions which allow. you can render them to animate when clicked and delete them
class Gif {
    constructor(id, string) {
        var that = this;
        this.ID = id;
        this.state = "static";
        this.newDiv = $('<div>');
        this.img = $('<img>');
        this.output = $('#gifs');
        $.ajax({
            url: this.linkbuilder(string),
            method: "GET"
        }).then(function (response) {
            let number = Math.floor(Math.random() * response.data.length)
            that.static = response.data[number].images.fixed_height_still.url;
            that.loop = response.data[number].images.fixed_height.url;
            that.img.attr('src', that.static).attr("data", that.ID).attr('width', '300px');
            that.newDiv.attr('class', "col-sm-6 col-lg-3 gif mx-5 my-2").attr("data", that.ID).append(that.img);
            that.output.prepend(that.newDiv);
        });

    }
    linkbuilder(string) {
        return `https://api.giphy.com/v1/gifs/search?api_key=7NCgQNu9PIxYnwBdzXkXtF9OLJEuaVd3&q=${string}&limit=50&offset=0&rating=pg&lang=en`
    }

    renderAfterClick() {
        this.newDiv.empty();
        if (this.state === 'static') {
            this.newDiv.append(this.img.attr("src", this.loop));
            this.state = "loop";
        }
        else {
            this.newDiv.append(this.img.attr("src", this.static));
            this.state = "static";
        }
    }
    DeleteSelf() {
        this.newDiv.remove();
    }
}
$(document).ready( function(){ 
$(document).on("click", "#submit", function () {
    let val = textInput.val();
    gifArray.push(new Gif(gifArray.length, val));
    if (gifArray.length > 4) {
        let removedGif = gifArray.splice(deletionNumber, 1, "false");
        deletionNumber++;
        removedGif[0].DeleteSelf();
    }



});

$(document).on("click", ".gif", function () {
    let clickedGif = gifArray[$(this).attr('data')];
    clickedGif.renderAfterClick();
});
});
var gamepattern = [];
var buttonColors = ["red", "green", "blue", "yellow"];

function nextSequence() {
    var r = Math.floor((Math.random() * 4));
    var randomChoosenColor = buttonColors[r];
    gamepattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).addClass("pressed");
    setTimeout(function () {
        $("#" + randomChoosenColor).removeClass("pressed");
    }, 250);

    var audio = new Audio("./sounds/" + randomChoosenColor + ".mp3");
    audio.play();
}




$(".btn").click(function () {
    
    var userChoosenColor = $(this).attr("id");
    
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
});



function playSound(sound) {
    var audio = new Audio("./sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(idd) {
    $("#" + idd).addClass("pressed");
    setTimeout(function () {
        $("#" + idd).removeClass("pressed");
    }, 100);
}

var level = 0;

$(document).keydown(function (event) {
    if (level == 0) {
        nextSequence();
        level++;
        $("h1").text("level " + level);
    }
})
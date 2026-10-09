var gamepattern = [];
var buttonColors = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var level = 0;

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

    level++;
    $("h1").html("level " + level);
}




$(".btn").click(function () {
    
    var userChoosenColor = $(this).attr("id");
    
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
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



$(document).keydown(function (event) {
    if (level == 0) {
        nextSequence();
    }
})

function checkAnswer(currentLevel) {
    if(gamepattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("right");
        if(userClickedPattern.length == gamepattern.length) {
            setTimeout (function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").html("Game Over!");

        startOver();
    }
}

function startOver() {
    $("h1").html("Press A Key to Start");
    level = 0;
    gamepattern.length = 0;
    userClickedPattern.length = 0;
}
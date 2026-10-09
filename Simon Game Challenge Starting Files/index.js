var userClickedPattern = [];
var arr = ["red", "green", "blue", "yellow"];
function nextSequence() {
    return Math.floor((Math.random() * 4));
}




$(".btn").click(function () {

    var color = arr[nextSequence()];
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);

})


function playSound(sound) {
    switch (sound) {
        case "green":
            var sound1 = new Audio("./sounds/green.mp3");
            sound1.play();
            break;

        case "blue":
            var sound2 = new Audio("./sounds/blue.mp3");
            sound2.play();
            break;

        case "red":
            var sound3 = new Audio("./sounds/red.mp3");
            sound3.play();
            break;

        case "yellow":
            var sound4 = new Audio("./sounds/yellow.mp3");
            sound4.play();
            break;

        default:
            break;
    }
}

function animatePress(idd) {
    $("#" + idd).addClass("pressed");
    setTimeout(function() {
        $("#" + idd).removeClass("pressed");
    }, 100);
}


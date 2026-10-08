var userClickedPattern = [];
var arr = ["red","green","blue","yellow"];
function randomNumber() {
    return Math.floor((Math.random() * 4));
}




$(".btn").click(function() {
    
    var color = arr[randomNumber()];
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    //sounds:
    
    switch (userChoosenColor) {
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
    
})
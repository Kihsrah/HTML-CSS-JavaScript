var random1 = Math.floor((Math.random() * 6) + 1);
var random2 = Math.floor((Math.random() * 6) + 1);

document.querySelectorAll("img")[0].setAttribute("src", "./images/dice" + random1 + ".png");
document.querySelectorAll("img")[1].setAttribute("src", "./images/dice" + random2 + ".png");
if(random1 > random2) {
    document.querySelector("h1").innerHTML = "Player 1 Won";
}
else if(random2 > random1) {
    document.querySelector("h1").innerHTML = "Player 2 Won";
}
else {
    document.querySelector("h1").innerHTML = "Draw";
}
const buttonColors = ["green", "red", "yellow", "blue"];
let gameSelection = [];
let userSelection = [];

let started = false;
let level = 0;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    $("h1").text("Level " + level);
    started = true;
  }
});

$("button").on("click", function () {
  const chosenColor = $(this).attr("id");
  userSelection.push(chosenColor);

  animatePress(chosenColor);
  playSound(chosenColor);

  checkAnswer(userSelection.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userSelection = [];
  level++;
  $("h1").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gameSelection.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gameSelection[currentLevel] === userSelection[currentLevel]) {
    if (userSelection.length === gameSelection.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gameSelection = [];
  started = false;
}

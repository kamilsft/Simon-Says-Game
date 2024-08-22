var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var game_started = false;
var level = 0;

$(document).keypress(function() {
  if (!game_started) { // if game started !false --> true
    $("#level-title").text("Level -> " + level);
    nextSequence();
    game_started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


//$("body").addClass("game_over")

function checkAnswer(currentLevel) {

  // checking if the most recent user answer is the same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    //console.log("Success");
    // checking if the user is finished with the sequence.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    // calling the func startOver(), if the user gets the sequence wrong.
    startOver();
  }
}

function nextSequence() {
  // reseting the userClickedPattern to an empty array that is ready for the next level
  userClickedPattern = [];
  // increment level by one
  level++;

  $("#level-title").text("Level -> " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// will make our code more clean
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  game_started = false;
}

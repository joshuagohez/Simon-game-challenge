// var
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;


// start game
let gameStart = false;

$(document).keypress(function() {
  if (!gameStart) { // execute based on true condition, same as if(gameStart === false) or if game have not start
      gameStart = true;
      $("#level-title").text("Level " + level);
      newSequence();
  }
});

// logging user button clicked history
$(".btn").on("click", function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // flash clicked colour and play audio
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  // check each button clicked
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("success");

    // check when level finished and call next level
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        newSequence();
      }, 1000);
      userClickedPattern.splice(0, userClickedPattern.length);
    }
  } else {
    // game over

    // game over audio
    console.log("wrong");
    playSound("wrong");

    // game over animation
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // game over text
    $("#level-title").text("Game over, press any key to restart");

    startOver();
  }
}

// generate random pattern
function newSequence() {
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // flash chosen colour and play audio
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

// playing audio of button clicked
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animation for clicked on button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  level = 0;
  gameStart = false;
  userClickedPattern = [];
}

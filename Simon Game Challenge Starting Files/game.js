let list = [];
let isUserTurn = false;
let isGameStarted = false;
let currentButtonIndex = 0; // Track the current button in the sequence

$(document).keypress(function(event) {
  if (!isGameStarted) {
    isGameStarted = true;
    startGame();
  }
});

function startGame() {
  list = [];
  currentButtonIndex = 0;
  addNextButtonToSequence();
}

function addNextButtonToSequence() {
  $("h1").text("Level " + (list.length + 1));
  const colors = ["red", "green", "yellow", "blue"];
  const nextColor = colors[Math.floor(Math.random() * colors.length)];
  list.push(nextColor);
  playSequence();
}

function playSequence() {
  isUserTurn = false;
  let i = 0;
  const interval = setInterval(function() {
    buttonLighter(list[i]);
    i++;
    if (i >= list.length) {
      clearInterval(interval);
      isUserTurn = true;
      currentButtonIndex = 0; // Reset user's button index
    }
  }, 800); // Adjust the delay as needed
}

function buttonLighter(color) {
  $("#" + color).fadeOut(100).fadeIn(100);
  soundMaker(color);
}

// Attach click event handlers to buttons
$("#red").on("click", function() {
  checkUserInput("red");
  buttonClicker("red");
  soundMaker("red");
});
$("#green").on("click", function() {
  checkUserInput("green");
  buttonClicker("green");
  soundMaker("green");
});
$("#yellow").on("click", function() {
  checkUserInput("yellow");
  buttonClicker("yellow");
  soundMaker("yellow");
});
$("#blue").on("click", function() {
  checkUserInput("blue");
  buttonClicker("blue");
  soundMaker("blue");
});

function buttonClicker(color){
  $("#" + color).addClass("pressed", 2000);
  setTimeout(function(){
    $("#" + color).removeClass("pressed", 2000);
  }, 100)

}

function checkUserInput(color) {
  if (!isUserTurn) return;

  if (list[currentButtonIndex] === color) {
    currentButtonIndex++;

    if (currentButtonIndex === list.length) {
      addNextButtonToSequence();
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  $("h1").text("Game Over, Press Any Key to Restart");
  soundMaker("wrong");
  $("body").css("background-color", "red");
  setTimeout(function(){
    $("body").css("background-color", "#011F3F");
  }, 200)
  list = [];
  isUserTurn = false;
  isGameStarted = false;
}

function soundMaker(buttoninner){  // works fine. makes sound of the color you put inside as a parameter
  switch (buttoninner) {
    case "red":
      var audio1 = new Audio("sounds/red.mp3");
      audio1.play();
      break;
    case "blue":
      var audio2 = new Audio("sounds/blue.mp3")
      audio2.play();
      break;
    case "yellow":
      var audio3 = new Audio("sounds/yellow.mp3")
      audio3.play();
      break;
    case "green":
        var audio4 = new Audio("sounds/green.mp3")
        audio4.play();
        break;
    case "wrong":
        var audio5 = new Audio("sounds/wrong.mp3")
        audio5.play();
    // Add cases for other buttons here if needed
  }
}

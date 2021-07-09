var buttonColours = ["red","blue","green","yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var wrongSound;

function playSound (name) {
	
	switch (name) {
		case "red":
			var redSound = new Audio("sounds/red.mp3");
			redSound.play();
		break;

		case "blue":
			var blueSound = new Audio("sounds/blue.mp3");
			blueSound.play();
		break;

		case "green":
			var greenSound = new Audio("sounds/green.mp3");
			greenSound.play();
		break;

		case "yellow":
			var yellowSound = new Audio("sounds/yellow.mp3");
			yellowSound.play();
		break;

		default:
			var wrong = new Audio("sounds/wrong.mp3");
			wrong.play();
	}
}

function nextSequence() {
	var randomNumber = Math.floor(Math.random()*4);
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	userClickedPattern = [];
	level+=1;

	$("#level-title").text("Level "+level);
	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
	playSound(randomChosenColour);
}

$(".btn").on("click", function(){
	var userChosenColour = this.id;
	userClickedPattern.push(userChosenColour);
	animatePress(userChosenColour);
	playSound(userChosenColour);
	console.log(userClickedPattern);
	console.log(gamePattern);
	checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColour) {
	$("#"+currentColour).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColour).removeClass("pressed");
	}, 100);
}

var gameStarted = false;
var score = 0;
var level = 0;

$(document).on("keypress", function(event) {
	if(gameStarted == false && score == 0){
		gameStarted = true;
		$("#level-title").html("Level 0");
		nextSequence();
	}
});

function checkAnswer(currentLevel){
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
			score = level*3;
		}
	} else {
		console.log("wrong");
		playSound(wrongSound);

		$("body").addClass("game-over");

		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").html("Game Over, Press Any Key to Restart <br> Your score is "+score);

		startOver();
	}
}

function startOver(){
	level = 0;
	gamePattern = [];
	gameStarted = false;
	score = 0;
}
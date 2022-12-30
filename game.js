var buttonColor = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false
var elementClicked = false;

document.addEventListener("keypress", function () {
    if (!started) {
        $("h1").text("Level " + level)
        nextSequence()
        started = true
    }
})

$(".btn").on("click", function () {
    elementClicked = true
    var userChosenColor = this.id
    userClickedPattern.push(userChosenColor)
    animatePress(userChosenColor)
    playSound(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed")
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed")
    }, 100)
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}
function nextSequence() {
    elementClicked = false
    level = level + 1
    $("h1").text("level " + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColor[randomNumber]
    $("." + randomChosenColor).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
    gamePattern.push(randomChosenColor)
    setInterval(function () {
        var n = 1000 - (Math.floor(level / 10) - 1) * 100
        if (n < 100) {
            n = 100
        }
        if (!elementClicked) {
            checkAnswer(level)
        }
    }, n)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong")
        playSound("wrong")
        $("body").addClass("game-over")
        $("h1").html("Game Over, Press Any Key To Restart")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        startOver()
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Global Variable

var startQuizButton = document.querySelector('#start');
var initialScreen = document.querySelector('.initial-screen');
var questionWrap = document.querySelector('.questionwrap');
var choicesDiv = document.querySelector('.choices');
var timeOutput = document.querySelector('#time-left');
var scoreOutput = document.querySelector('.score-wrap');
var saveBtn = document.querySelector('#save-score');
var time = 70;
var timer;
var questionIndex = 0;
clicked = false;

// Functions

// This function starts the quiz on pressing the start button which makes the initial screen to hide.
function startQuiz() {
    initialScreen.classList.add('hide');
    questionWrap.classList.remove('hide');
    displayQuestion();
    startTimer();
}

// This function displays the first question and we are ready to play the quiz
function displayQuestion() {
    var currentQuestionSet = questionContainer[questionIndex]
    var questionEl = document.querySelector('.question-text');
    questionEl.innerText = currentQuestionSet.questionText;
    choicesDiv.innerHTML = '';
    for (var i = 0; i < currentQuestionSet.choices.length; i++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.innerText = currentQuestionSet.choices[i];
        choicesDiv.append(choiceBtn);
    }
}

// This function starts with the display question function and it runs down the clock ticking every second.
function startTimer() {
    timeOutput.innerText = 'Time: ' + time
    timer = setInterval(function () {
        if ((time - 1) < 0) {
            time = 0;
        } else {
            time--;
            timeOutput.innerText = 'Time: ' + time;
            if (time <= 0) {
                endGame();
            }
        };
    }, 1000);
}

// This functions verifies the answer and alerts the quiz taker about the result of his choice selection
function answerVerify(eventObj) {
    eventObj.stopPropagation();
    if (clicked) {
        return;
    }
    var userSelection = eventObj.target;
    if (userSelection.tagName === 'BUTTON') {
        var userAnswer = userSelection.innerText;
        var answerAlert = document.querySelector('.answer-alert');
        if (userAnswer === questionContainer[questionIndex].correctAnswer) {
            answerAlert.innerText = 'Correct';
            answerAlert.classList.add('show');
        } else {
            answerAlert.innerText = 'Wrong';
            answerAlert.classList.add('show');
            time = (time - 10) < 0 ? 0 : time - 10;
        }
        clicked = true;

        setTimeout(function () {
            answerAlert.className += 'hide';
            questionIndex++;

            if (questionIndex === questionContainer.length) {
                endGame();
            } else {
                displayQuestion();
                clicked = false;
            }

        }, 1000);
    }
}
//  This function ends the game wherein the question and its choices disapper and the score appears enabling the player the save their score.
function endGame() {
    clearInterval(timer);
    questionWrap.className += 'questionwrap hide';
    var score = document.querySelector("#score-output");
    score.innerText = 'Score: ' + time;
    scoreOutput.classList.remove('hide');

}

// This function save the score and updates the highscores array with the newly updated array
function saveScore() {
    var initialInput = document.querySelector("#initial-input");
    var nameValue = initialInput.value;
    var rawData = localStorage.getItem('highscores');
    var highscores = JSON.parse(rawData) || [];

    highscores.push({
        initials: nameValue,
        score: time
    })
    localStorage.setItem('highscores', JSON.stringify(highscores))
    window.location = './highscores.html';
}

// This function retrieves the highscores and output a div into the DOm for each highscore object
var highscoreOutput = document.querySelector('highscores-output');
function outputHighscores() {
    var rawData = localStorage.getItem('highscores');
    var highscores = JSON.parse(rawData);
    for (var i = 0; i < highscores.length; i++) {
        var record = document.createElement('div');
        var h3 = document.createElement('h3');
        var p = document.createElement('p');
        var scoreObj = highscores[i];
        h3.innerText = "Initials: " + scoreObj.initials;
        p.innerText = "Score: " + scoreObj.score;
        record.append(h3, p);
        highscoreOutput.append(record);
    }

}

outputHighscores()

// Event Listeners
startQuizButton.addEventListener('click', startQuiz);
choicesDiv.addEventListener('click', answerVerify);
saveBtn.addEventListener('click', saveScore)
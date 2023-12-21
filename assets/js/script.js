// Show the start button

var startQuizButton = document.querySelector('#start');

startQuizButton.addEventListener('click', function () {

    // Hide the start button
    startQuizButton.style.display = 'none';



    // To start the timer & question

    var timerElement = document.querySelector('.timer');
    var currentQuestionElement = document.querySelector('.question-wrap');
    var currentQuestionText = document.querySelector('.question-text');
    var currentQuestionChoices = document.querySelector('.choices');
    var time = 5;
    var timer;
    var currentQuestionIndex = 0
    currentQuestionText.innerText = currentQuestionElement.questionText;

    timerElement.style.display = 'initial';
    currentQuestionElement = 'initial';
    function startGame() {
        timer = setInterval(function () {
            time--;
            timerElement.innerText = 'Time Left: ' + time;
            if (time <= 0) {
                endGame();
            }
        }, 1000)
    };
    startGame()
    console.log(currentQuestionIndex)

    function endGame() {
        clearInterval(timer);
        var messageParagraph = document.querySelector('#message');
        messageParagraph.innerText = 'Game Over';
        messageParagraph.style.display = 'initial';
    }
});
// function displayQuestion() {
//     var questionText = document.querySelector.('questionText');
//     var choicesContainer = document.getElementById('choices');

//     questionText.textContent = '';
//     choicesContainer.innerHTML = '';
// }
// displayQuestion()
//array of questions, answers and the correct answer
var questions = [{
    
    questionContent: "What prefix is required to select and element by it's class attribute?",
    answers: [  "A. #",  "B. <>",  "C. .", "D. $"],
    answer: "C. .",
},
{
    questionContent: "Which data type only returns values of true or false?",
    answers: ["A. String", "B. Boolean", "C. Array", "D. Switch",],
    answer: "B. Boolean",
},
{
    questionContent: "Which method will save data to localStorage? ",
    answers: ["A. getItem()", "B. saveItem()", "C. storeItem()", "D. setItem()"],
    answer: "D. setItem()",
},
{
    questionContent:"Which of the following would equal ten minutes in js?",
    answers: ["A. 600000", "B. 100000", "C. 10000", "D. 60000"],
    answer: "A. 600000",
},
{
    questionContent: "What does CSS stand for?",
    answers: [ "A. Concave Style Standard", "B. Cascading Standard Sheet", "C. Cascading Style Sheets", "D. Clever Sheet Styles"],
    answer: "C. Cascading Style Sheets",
}];

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timeOver = document.getElementById("timeOver");

var start = document.getElementById("start");
var startButton = document.getElementById("start-button");

var questionSection = document.getElementById("questionSection");
var questionTitle = document.getElementById("questionTitle");
var answerA = document.getElementById("btn0");
var answerB = document.getElementById("btn1");
var answerC = document.getElementById("btn2");
var answerD = document.getElementById("btn3");
var verifyAnswer = document.getElementById("verifyAnswer");

var results = document.getElementById("results");
var submitBtn = document.getElementById("submitBtn");
var input = document.getElementById("input");
var main = document.getElementById("main");

var highScores = document.getElementById("highScores");
var finalScore = document.getElementById("finalScore");

var backButton = document.getElementById("back-button");
var clearLeaderboardBtn = document.getElementById("clearLeaderboardBtn");
var viewScores = document.getElementById("viewScores");
var leaderboard = document.getElementById("leaderboard");

var correctAnswers = 0;
var currentQuestion = 0;
var totalScore;
var questionIndex = 0;

var totalTime = 151;
function startQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = ""; 

    start.style.display = "none";
    questionSection.style.display = "block";
    timer.style.display = "block";
    timeOver.style.display = "none";

    var startTimer = setInterval(function () {
        totalTime--;
        timeLeft.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startTimer);
            if(questionIndex < questions.length - 1) {
                endQuiz();
            }
        }

    }, 1000);
    displayQuiz();
};

function displayQuiz () {
    displayQuestion();
}

function displayQuestion() {
    questionTitle.textContent = questions[questionIndex].questionContent;
    answerA.textContent = questions[questionIndex].answers[0];
    answerB.textContent = questions[questionIndex].answers[1];
    answerC.textContent = questions[questionIndex].answers[2];
    answerD.textContent = questions[questionIndex].answers[3];
}

function correctAnswer(answer) {
    var breakLine = document.getElementById("breakLine");
    breakLine.style.display = "block";
    verifyAnswer.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].answers[answer]) {
        correctAnswers++;
        verifyAnswer.textContent = "Correct!";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime; 
        verifyAnswer.textContent = "Incorrect";
    }
    questionIndex++;
    if (questionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}
//check answers to see if correct
function choiceA() { correctAnswer(0); }
function choiceB() { correctAnswer(1); }
function choiceC() { correctAnswer(2); }
function choiceD() { correctAnswer(3); }

//end the quiz
function endQuiz() {
    results.style.display = "block";
    questionSection.style.diaply = "none";
    start.style.display = "none";
    timer.style.display = "none";
    timeOver.style.display = "block";

    finalScore.textContent = correctAnswers;
}

function saveScore(event) {
    event.preventDefault();

    if (input.value === "") {
        alert("Please enter your initals to continue");
        return;
    }

    start.style.display = "none";
    timer.style.display = "none";
    timeOver.style.display = "none";
    results.style.display = "none";
    highScores.style.display = "block";

    var savedScores = localStorage.getItem("high scores");
    var savedScoresArr;

    if (savedScores === null) {
        savedScoresArr = [];
    } else {
        savedScoresArr = JSON.parse(savedScores);
    }
    var playerScore = {
        initials: input.value,
        score: finalScore.textContent
    };

    savedScoresArr.push(playerScore);

    //stringify our scores array to store in localStorage
    var savedScoresArrString = JSON.stringify(savedScoresArr);
    window.localStorage.setItem("high scores", savedScoresArrString);

    displayScores();
}

function displayScores(){

start.style.display = "none";
timer.style.display = "none";
questionSection.style.display = "none";
timeOver.style.display = "none";
results.style.display = "none";
highScores.style.display = "block";

var savedScores = localStorage.getItem("high scores");

if (savedScores === null) {
    return;
}

var storedScores = JSON.parse(savedScores);

for (i = 0; i < storedScores.length; i++) {
    var newHighScore = document.createElement("p");
    newHighScore.innerHTML = storedScores[i].initials + ": " + storedScores[i].score;
    leaderboard.appendChild(newHighScore);
}
}

startButton.addEventListener("click", startQuiz);
answerA.addEventListener("click", choiceA);
answerB.addEventListener("click", choiceB);
answerC.addEventListener("click", choiceC);
answerD.addEventListener("click", choiceD);

submitBtn.addEventListener("click", function(event) {
    displayScores(event);
});

backButton.addEventListener("click", function () {
    start.style.display = "block";
    highScores.style.display = "none";
});

clearLeaderboardBtn.addEventListener("click", function() {
    window.localStorage.removeItem("high scores");
    leaderboard.innerHTML = "High Scores Cleared";
    leaderboard.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: bold;")
});
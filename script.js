// DOM Elements
const startScreen = document.getElementById("start-screen")
const quizScreen = document.getElementById("quiz-screen")
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "In software engineering, which of the following is a way to avoid repeating code?",
    answers: [
      { text: "Writing longer functions each time", correct: false },
      { text: "Copy-pasting code whenever needed", correct: false },
      { text: "Using loops and functions", correct: true },
      { text: "Copy-pasting code whenever needed", correct: false },
    ],
  },
  {
    question: "What does “responsive design” mean in web development?",
    answers: [
      { text: "A website works without internet", correct: false },
      { text: "A website adjusts its layout to different screen sizes", correct: true },
      { text: "A website responds to voice commands", correct: false },
      { text: "A website loads very quickly", correct: false },
    ],
  },
  {
    question: "What is the purpose of an API in software development?",
    answers: [
      { text: "To secure user passwords", correct: false },
      { text: "To store large amounts of data", correct: false },
      { text: "To design website layouts", correct: false },
      { text: "To allow different software systems to communicate", correct: true },
    ],
  },
  {
    question: "Which of the following best describes a “bug” in software?",
    answers: [
      { text: "A security feature", correct: false },
      { text: "A security feature", correct: false },
      { text: "An error or flaw in a program that causes incorrect behavior", correct: true },
      { text: "A tool for testing performance", correct: false },
    ],
  },
  {
    question: "What does Git primarily help developers do?",
    answers: [
      { text: "Track and manage changes to code", correct: true },
      { text: "Compile programming languages", correct: false },
      { text: "Store passwords securely", correct: false },
      { text: "Design user interfaces", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// EVENT LISTENERS

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)


function startQuiz(){
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active")
    quizScreen.classList.add("active")

    showQuestion()
}

function showQuestion() {
    // reset state
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);    
    })
}

function selectAnswer(event) {
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        }else {
            showResults()
        }
    },1000)

}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if(percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}
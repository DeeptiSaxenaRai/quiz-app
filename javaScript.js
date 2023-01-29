let timeLeft = document.querySelector(".timer-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-btn");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector("start-screen");
let startButton = document.getElementById("start-btn");

// Globally define the variable
let questionCount;
let scoreCount = 0;
let timeCount = 31;
let countDown = 0;

const quizArray = [
  {
    id: "0",
    question:
      "How do you select an element with a specific ID using JavaScript?",
    options: [
      "document.getElementById('id')",
      "document.querySelector('#id')",
      "document.getElementsByClassName('id')",
      "document.getElementByTagName('id')",
    ],
    correct: "document.getElementById('id')",
  },
  {
    id: "1",
    question:
      "How do you select all elements with a specific class using JavaScript?",
    options: [
      "document.getElementsByClassName('class')",
      "document.querySelector('#class')",
      "document.querySelectorAll('.class')",
      "document.getElementById('class')",
    ],
    correct: "document.querySelectorAll('.class')",
  },
  {
    id: "2",
    question:
      "Which of the following is the correct way to create an audio element in javascript ?",
    options: [
      "let audioPlayer = new Audio('sounds/clap.wav')",
      "let audioPlayer = new audio('sounds/clap.wav')",
      "let audioPlayer = createAudio('sounds/clap.wav')",
      "let audioPlayer = Audio('sounds/clap.wav')",
    ],
    correct: "let audioPlayer = new Audio('sounds/clap.wav');",
  },
  {
    id: "3",
    question:
      "When defining a class, which of the following methods is called when a new instance of the class is created?",
    options: ["init", "create", "constructor", "class"],
    correct: "constructor",
  },
  {
    id: "4",
    question:
      "What is the purpose of the super() method/function when used inside a derived class constructor? ",
    options: [
      "It is used to call the parent class constructor",
      "It is used to call a method of the parent class",
      "It is used to set the prototype of the derived class",
      "It is used to bind the 'this' keyword to the parent class context",
    ],
    correct: "It is used to call the parent class constructor",
  },
];

// Timer
const timerDisplay = () => {
  countDown = setInterval(() => {
    timeCount--;
    timeLeft.innerHTML = `${timeCount}`;
    if (timeCount === 0) {
      clearInterval(countDown);
      checker();
    }
  }, 1000);
};

// Next button
nextBtn.addEventListener("click", function () {
  questionCount += 1;
  if (questionCount === quizArray.length) {
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    userScore.innerHTML = `Your score is ${scoreCount} out of ${questionCount}`;
  } else {
    countOfQuestion.innerHTML = `${questionCount + 1} of ${
      quizArray.length
    } question`;
    quizDisplay(questionCount);
    timeCount = 31;
    clearInterval(countDown);
    timerDisplay();
  }
});

// display quiz
const quizDisplay = (questionCount) => {
  let quizCard = document.querySelectorAll(".container-mid");

  // hide other Cards
  quizCard.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCard[questionCount].classList.remove("hide");
};

function quizCreator() {
  // For random question
  quizArray.sort(() => Math.random() - 0 - 5);
  // generate quiz
  for (let i of quizArray) i.options.sort(() => Math.random() - 0.5);
  // quiz container
  let optionDiv = document.createElement("div");
  optionDiv.classList.add("container-mid", "hide");

  countOfQuestion.innerHTML = `1 of ${quizArray.length} questions`;

  let questionContainer = document.createElement("p");
  questionContainer.classList.add("question");
  questionContainer.innerHTML = `${quizArray.question}`;

  optionDiv.appendChild(questionContainer); //append question and option
  optionDiv.innerHTML = `
  <button class="option-div" onclick="checker(this)">${quizArray.options[0]}</button>
  <button class="option-div" onclick="checker(this)">${quizArray.options[1]}</button>
  <button class="option-div" onclick="checker(this)">${quizArray.options[2]}</button>
  <button class="option-div" onclick="checker(this)">${quizArray.options[3]}</button>
     `;
  quizContainer.appendChild(optionDiv);
}

// make the function to check option value is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  // if (userSolution === quizArray[questionCount].correct) {
  if (userSolution === question.correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    quizArray.options.forEach((element) => {
      if (Element.innerText === question.correct) {
        element.classList.add("correct");
      }
    });
  }
}
//stop timer
clearInterval(countDown);
quizArray.forEach((element) => {
  element.disabled = true;
});

// Initaial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  timeCount = 31;
  clearInterval(countDown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}
// start button click
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

// Hide Quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

// restart button
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

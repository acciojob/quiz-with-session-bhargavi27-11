//your JS code here.
// your JS code here.

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");

// load saved answers from sessionStorage
let userAnswers =
  JSON.parse(sessionStorage.getItem("userAnswers")) || [];

// save answer when user selects an option
document.addEventListener("change", function (e) {
  if (e.target.type === "radio") {
    const index = Number(e.target.name.split("-")[1]);
    userAnswers[index] = e.target.value;
    sessionStorage.setItem(
      "userAnswers",
      JSON.stringify(userAnswers)
    );
  }
});

// submit quiz
submitButton.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  resultElement.textContent = `Your score is ${score}`;
  localStorage.setItem("score", score);
});

// show score after refresh
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  resultElement.textContent = `Your score is ${savedScore}`;
}

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

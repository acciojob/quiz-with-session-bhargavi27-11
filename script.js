// ================= YOUR JS CODE =================

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// restore answers
let userAnswers =
  JSON.parse(localStorage.getItem("userAnswers")) || [];

// listen to radio clicks
document.addEventListener("change", function (e) {
  if (e.target.type === "radio") {
    const index = Number(e.target.name.split("-")[1]);

    // remove checked attr from same group
    document
      .querySelectorAll(`input[name="question-${index}"]`)
      .forEach((radio) => radio.removeAttribute("checked"));

    e.target.setAttribute("checked", "true");

    userAnswers[index] = e.target.value;
    localStorage.setItem(
      "userAnswers",
      JSON.stringify(userAnswers)
    );
  }
});

// submit
submitButton.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score.toString());
});

// show saved score after reload
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// ========== DO NOT CHANGE CODE BELOW THIS LINE ==========
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

function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    questionElement.appendChild(
      document.createTextNode(question.question)
    );

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      if (userAnswers[i] === choice) {
        input.setAttribute("checked", "true");
      }

      questionElement.appendChild(input);
      questionElement.appendChild(document.createTextNode(choice));
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();
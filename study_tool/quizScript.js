import {Question, Quiz} from "./quizBrain.js";
import rawQuizJSON from "./input_files/inputTFD.json" assert {type: "json"};

// Load in questions and create quiz object
const inputQuestions = [];
for (const q of rawQuizJSON.questList) {
  inputQuestions.push(new Question(q.ask, q.options, q.feedback));
}
const quiz = new Quiz(rawQuizJSON.title, inputQuestions);

document.getElementById("quiz-title").innerHTML = rawQuizJSON.title;
document.getElementById("subtitle").innerHTML = rawQuizJSON.subtitle;
document.getElementById("logo").src = rawQuizJSON.logo;
document.getElementById("logo").style.display = "block";

/*******  Assign html elements   **/
// question buttons
const currAsk = document.getElementById("question");
const currOptions = document.getElementsByClassName("option-label");
const currOptBundles = document.getElementsByClassName("option-bundle");
const radioBtns = document.getElementsByClassName("option");
// quiz navigation buttons
const allNavBtns = document.getElementsByClassName("btn");
const backBtn = document.getElementById("btn-back");
const checkBtn = document.getElementById("btn-check-answer");
const nextBtn = document.getElementById("btn-next");
//const resetBtn = document.getElementById("btn-reset");

// feedback and counters
const attempts = document.getElementById("attempts");
const feedback = document.getElementById("feedback");
const feedbackCorrect = document.getElementById("feedback-correct");
const feedbackAnswer = document.getElementById("feedback-answer");

/******   Highlighting for hover click etc  *****/
for (const btn of allNavBtns) {
  btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "whitesmoke";
  });
}
backBtn.addEventListener("mouseenter", () => {
  if (quiz.currQ > 1) backBtn.style.backgroundColor = "lightblue";
});
checkBtn.addEventListener("mouseenter", () => {
  if (!quiz.getCurrQuest().done) {
    checkBtn.style.backgroundColor = "rgba(255, 255, 0, 0.553)";
  }
});
nextBtn.addEventListener("mouseenter", () => {
  if (!quiz.endQuiz) {
    nextBtn.style.backgroundColor = "lightblue";
  }
});
const checkValidBtns = () => {
  if (quiz.endQuiz && quiz.currQ === quiz.questList.length) nextBtn.disabled = true;
  else nextBtn.disabled = false;
  if (quiz.getCurrQuest().done) checkBtn.disabled = true;
  else checkBtn.disabled = false;
  if (quiz.currQ <= 1) backBtn.disabled = true;
  else backBtn.disabled = false;
  for (const btn of allNavBtns) {
    btn.style.backgroundColor = "whitesmoke";
  }
};
// highlighting for select and deselect radio btn elements
// find a more efficient way to do this
for (const btn of radioBtns) {
  btn.addEventListener("change", () => {
    for (const i in radioBtns) {
      if (radioBtns[i].checked == true) {
        currOptBundles[i].style.backgroundColor = "rgba(173, 216, 230, 0.534)";
        currOptBundles[i].style.border = "0.25rem dashed black";
      } else if (radioBtns[i].checked == false) {
        currOptBundles[i].style.backgroundColor = "whitesmoke";
        currOptBundles[i].style.border = "0.25rem dashed rgba(173, 216, 230, 0.534)";
      }
    }
  });
}
// for new question, set new answers for radio buttons
const setNewOptions = (newQ) => {
  let i = 0;
  for (const option of currOptions) {
    if (newQ.options[i] == undefined) {
      option.style.display = "none";
      radioBtns[i].style.display = "none";
      currOptBundles[i].style.display = "none";
      currOptBundles[i].style.border = "0.25rem dashed rgba(173, 216, 230, 0.534)";
      option.innerHTML = "";
      radioBtns[i].value = "";
      radioBtns[i].checked = false;
    } else {
      option.style.display = "inline";
      radioBtns[i].style.display = "inline-block";
      currOptBundles[i].style.display = "block";
      currOptBundles[i].style.backgroundColor = "whitesmoke";
      currOptBundles[i].style.border = "0.25rem dashed rgba(173, 216, 230, 0.534)";
      option.innerHTML = `${newQ.options[i]}`;
      radioBtns[i].value = `${newQ.options[i]}`;
      radioBtns[i].checked = false;
    }
    ++i;
  }
};
// for new question, set new answers for radio buttons
const setNewQuestion = () => {
  //let okay = quiz.goNext;
  if (quiz.goNext || quiz.getCurrQuest().attempts > 0) {
    feedback.style.display = "none";
    let currQ = quiz.askQuestion();
    currAsk.innerHTML = currQ.ask;
    setNewOptions(currQ);
    checkValidBtns();
    if (currQ.done) {
      displayFeedback(true);
    }
  } else alert("question must be checked before moving on");
};
nextBtn.addEventListener("click", setNewQuestion);

// inital set up, also called for reset
const setUp = () => {
  feedback.style.display = "none";
  let currQ = quiz.askQuestion();
  currAsk.innerHTML = currQ.ask;
  setNewOptions(currQ);
  checkValidBtns();
};
setUp();

const displayFeedback = (correct) => {
  if (correct) {
    feedbackCorrect.innerHTML = "CORRECT :)";
    feedbackAnswer.innerHTML = `${quiz.getCurrQuest().feedback}`;
    feedbackCorrect.style.color = "green";
  } else {
    feedbackCorrect.innerHTML = "INCORRECT :(";
    feedbackCorrect.style.color = "red";
    feedbackAnswer.innerHTML = "";
  }
  attempts.innerHTML = `Attempts: ${quiz.getCurrQuest().attempts}`;
  document.getElementById("correct-count").innerHTML = `Correct: ${quiz.correctCount}`;
  feedback.style.display = "block";
};

const checkAnswer = () => {
  if (!quiz.getCurrQuest.done) {
    let answer = undefined;
    for (const btn of radioBtns) {
      if (btn.checked) {
        answer = btn.value;
        quiz.goNext = true;
        break;
      }
    }
    if (answer === undefined) alert("Please select an option");
    else if (typeof answer !== "string")
      throw new Error("invalid answer input, must be type string");
    else displayFeedback(quiz.checkAnswer(answer));
  } else throw new Error("Question already properly answered");
};
checkBtn.addEventListener("click", checkAnswer);

const previousQuestion = () => {
  //feedback.style.display = "block";
  let currQ = quiz.previousQuest();
  currAsk.innerHTML = currQ.ask;
  setNewOptions(currQ);
  if (currQ.done === true) displayFeedback("true");
  else if (currQ.attempts > 0) displayFeedback(false);
  checkValidBtns();
  quiz.goNext = true;
};
backBtn.addEventListener("click", previousQuestion);

const restartQuiz = () => {
  if (confirm("Are you sure you want to restart?")) {
    quiz.restart();
    setUp();
  }
};
//resetBtn.addEventListener("click", restartQuiz);

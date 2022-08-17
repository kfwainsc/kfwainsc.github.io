const allOptions = document.getElementsByClassName("option-label");
let newOptions = ["new option", "best", "true", "false"];

const setNewOptions = () => {
  let i = 0;
  let charCode = 65;
  for (let option of allOptions) {
    option.innerHTML = `<input id="radio-${String.fromCharCode(
      charCode
    )}" class="option" type="radio" name="option" value="A">${newOptions[i]}`;
    console.log(`${i} ${String.fromCharCode(charCode)}`);
    ++i;
    ++charCode;
  }
};
const nextBtn = document.getElementById("btn-next");
nextBtn.addEventListener("click", setNewOptions);

const checkAnswer = () => {
  console.log("checking answer");
};
const checkBtn = document.getElementById("btn-check-answer");
checkBtn.addEventListener("click", checkAnswer);

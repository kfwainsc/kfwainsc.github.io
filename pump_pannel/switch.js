let splashColor = document.getElementsByTagName("body")[0];

let eventTarget = document.getElementById("toggle");
eventTarget.addEventListener("click", function () {
  splashColor.style.backgroundColor = "red";
});

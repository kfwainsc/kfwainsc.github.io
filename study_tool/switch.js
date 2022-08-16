const myBody = document.getElementById("myBody");
const changeBtn = document.getElementById("changeBtn");
changeBtn.addEventListener(
  "click",
  (randBgColor = () => {
    const colors = ["lightgrey", "grey", "orange", "lightblue", "darkgreen", "darkblue", "indigo"];
    let num = Math.floor(Math.random() * 7);
    if (num > 2) {
      myBody.style.color = "whitesmoke";
    } else myBody.style.color = "black";
    myBody.style.backgroundColor = colors[num];
  })
);

const time = document.getElementById("time");
const timeBtn = document.getElementById("timeBtn");
timeBtn.addEventListener(
  "click",
  (giveTime = () => {
    if (time.innerHTML === "t") {
      time.innerHTML = Date();
      time.style.display = "block";
      timeBtn.innerHTML = "jk, dont want time";
    } else {
      time.innerHTML = "t";
      time.style.display = "none";
      timeBtn.innerHTML = "give me Time";
    }
  })
);

const emergencyBtn = document.getElementById("emergency");
emergencyBtn.addEventListener(
  "click",
  (callAlert = () => {
    alert("GET OFF THIS PAGE and call 9-1-1");
  })
);

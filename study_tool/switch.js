//alert("Hello");

function giveTime() {
  //const timeH2 = document.getElementById("time");
  //timeH2.innterHTML = Date();
  if (document.getElementById("time").innerHTML == "t") {
    document.getElementById("time").innerHTML = Date();
    document.getElementById("time").style.display = "block";
    document.getElementById("timeBtn").innerHTML = "jk, dont want time";
  } else {
    document.getElementById("time").innerHTML = "t";
    document.getElementById("time").style.display = "none";
    document.getElementById("timeBtn").innerHTML = "give me Time";
  }
}

function randBgColor() {
  const colors = ["lightgrey", "grey", "orange", "lightblue", "darkgreen", "darkblue", "indigo"];
  let num = Math.floor(Math.random() * 7);
  if (num > 2) {
    document.getElementById("myBody").style.color = "whitesmoke";
  } else document.getElementById("myBody").style.color = "black";
  document.getElementById("myBody").style.backgroundColor = colors[num];
}

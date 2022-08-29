// need imporvement
// will not resize again if width changes
if (screen.width <= 480) {
  document.querySelector("#see-more h2").innerHTML = "to see more...";
}
if (screen.width >= 650) {
  document.getElementById("pump-img").src = "./images/pumpPanelWide.jpg";
}
//  if wide enough for squares, use large truck pic

// workout
/*window.onresize(function () {
  if (screenWidth > 480) {
    const seeMore = document.getElementById("see-more");
    seeMore.innerHTML = "to see more portfolio projects...";
  }
}); */

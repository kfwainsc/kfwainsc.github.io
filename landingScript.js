let screenWidth = screen.width;

// need imporvement
// will not resize again if width changes
if (screenWidth <= 480) {
  const seeMore = document.getElementById("see-more");
  seeMore.innerHTML = "to see more...";
}
//  if wide enough for squares, use large truck pic

// workout
/*window.onresize(function () {
  if (screenWidth > 480) {
    const seeMore = document.getElementById("see-more");
    seeMore.innerHTML = "to see more portfolio projects...";
  }
}); */

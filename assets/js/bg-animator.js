const bgPatternCircles = document.querySelectorAll(".bg-pattern-cont circle");
const bgPatternLines = document.querySelectorAll(".bg-pattern-cont path");

let circleIndex = 0;
let lineIndex = 0;
let intervalTime = 1000;
let myInterval;
let sparkInterval;
let i = 0;
let randomPatternLineIndex = Math.floor(Math.random() * bgPatternLines.length);

export function bgAnimator() {
  myInterval = window.setInterval(setAnimation, intervalTime);
}

function setAnimation() {
  const selectedLine = document.querySelector(".bg-pattern-cont path.selected");
  if (selectedLine !== null) {
    selectedLine.classList.remove("selected");
  }
  bgPatternCircles.forEach((circle, i) => {
    const cx = circle.getAttribute("cx");
    const cy = circle.getAttribute("cy");
    circle.classList.remove("selected");
    const d = bgPatternLines[lineIndex].getAttribute("d");
    if (d.includes(cx) && d.includes(cy)) {
      circle.classList.add("selected");
    }
  });
  bgPatternLines[lineIndex].classList.add("selected");
  circleIndex = (circleIndex + 1) % bgPatternCircles.length;
  lineIndex += 1;
  if (lineIndex % bgPatternLines.length == 0) {
    window.setTimeout(() => {
      document
        .querySelector(".bg-pattern-cont path.selected")
        .classList.remove("selected");
    }, intervalTime);
    slowInterval();
  }
}
function FinalSpark() {
  sparkInterval = window.setInterval(setFinalSpark, 1000);
}
function setFinalSpark() {
  i++;
  console.log(randomPatternLineIndex);
  bgPatternLines[randomPatternLineIndex].classList.add("selected");
  window.setTimeout(() => {
    bgPatternLines[randomPatternLineIndex].classList.remove("selected");
  }, 500);
  if (i >= 3) {
    randomPatternLineIndex = Math.floor(Math.random() * bgPatternLines.length);
    i = 0;
    window.clearInterval(sparkInterval);
    myInterval = window.setInterval(setAnimation, intervalTime);
  }
}
function slowInterval() {
  lineIndex %= bgPatternLines.length;
  window.clearInterval(myInterval);
  intervalTime -= 250;
  if (intervalTime < 250) {
    intervalTime = 1000;
  }
  FinalSpark();
}

// console.log(bgPatternCircles[12].getAttribute("cx"));
// console.log(bgPatternCircles[12].getAttribute("cy"));
// bgPatternLines[0].style.stroke = "#000";
// console.log(bgPatternLines[0].getAttribute("d"));

// top one is 9, middle one is 12

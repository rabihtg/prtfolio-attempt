const languageSlider = document.querySelector(".intro__languages-slider-cont");
let sliderPos = {
  left: 0,
  x: 0,
};
let maxLeft = languageSlider.scrollWidth - languageSlider.clientWidth;
let step = maxLeft / 1.95;
let hintInterval;

export { windowResizeHandler, dragSlider, hintSlider, sliderCancelAll };

function windowResizeHandler() {
  window.addEventListener("resize", resetScrollValues);
}

function dragSlider() {
  languageSlider.addEventListener("mousedown", sliderMouseDown);
}
function hintSlider() {
  languageSlider.addEventListener("touchstart", clearHintSlider);
  languageSlider.addEventListener("touchend", hintSlider);
  hintInterval = window.setInterval(() => {
    if (languageSlider.scrollLeft >= maxLeft - 10) {
      step = -1 * (maxLeft / 2);
    } else if (languageSlider.scrollLeft <= 10) {
      step = maxLeft / 2;
    }
    languageSlider.scrollTo({
      left: languageSlider.scrollLeft + step,
      behavior: "smooth",
    });
  }, 1500);
}
function sliderMouseDown(e) {
  clearHintSlider();
  languageSlider.classList.add("mouse-down");
  languageSlider.addEventListener("mousemove", sliderMouseMove);
  languageSlider.addEventListener("mouseup", sliderMouseUp);
  languageSlider.addEventListener("mouseleave", sliderMouseUp);
  sliderPos = {
    left: languageSlider.scrollLeft,
    x: e.clientX,
  };
}
function sliderMouseUp() {
  languageSlider.removeEventListener("mouseleave", sliderMouseUp);
  languageSlider.removeEventListener("mousemove", sliderMouseMove);
  languageSlider.removeEventListener("mouseup", sliderMouseUp);
  languageSlider.classList.remove("mouse-down");
  hintSlider();
}
function sliderMouseMove(e) {
  const dx = (e.clientX - sliderPos.x) * 2;
  languageSlider.scrollLeft = sliderPos.left - dx;
}

function clearHintSlider() {
  window.clearInterval(hintInterval);
}
function resetScrollValues() {
  clearHintSlider();
  maxLeft = languageSlider.scrollWidth - languageSlider.clientWidth;
  hintSlider();
}

function sliderCancelAll() {
  clearHintSlider();
  languageSlider.removeEventListener("mousedown", sliderMouseDown);
  languageSlider.removeEventListener("touchstart", clearHintSlider);
  languageSlider.removeEventListener("touchend", hintSlider);
  languageSlider.removeEventListener("mouseleave", sliderMouseUp);
  languageSlider.removeEventListener("mousemove", sliderMouseMove);
  languageSlider.removeEventListener("mouseup", sliderMouseUp);
  languageSlider.classList.remove("mouse-down");
}

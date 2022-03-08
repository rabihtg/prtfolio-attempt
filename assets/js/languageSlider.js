const languageSlider = document.querySelector(".intro__languages-slider-cont");
let sliderPos = {
  left: 0,
  x: 0,
};
let maxLeft = languageSlider.scrollWidth - languageSlider.clientWidth;
let step = 1;
let hintInterval;
let hintTimeout;

export { windowResizeHandler, dragSlider, hintSlider, sliderCancelAll };

function windowResizeHandler() {
  window.addEventListener("resize", resetScrollValues);
}

function dragSlider() {
  languageSlider.addEventListener("mousedown", sliderMouseDown);
}
function hintSlider() {
  languageSlider.addEventListener("touchstart", clearHintSlider);
  hintTimeout = window.setTimeout(() => {
    hintInterval = window.setInterval(() => {
      step += step > 0 ? 1 : -1;
      languageSlider.scrollLeft += step;
      if (languageSlider.scrollLeft >= maxLeft) {
        step = -1;
      } else if (languageSlider.scrollLeft == 0) {
        window.clearInterval(hintInterval);
      }
    }, 10);
  }, 1000);
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
}
function sliderMouseMove(e) {
  const dx = (e.clientX - sliderPos.x) * 2;
  languageSlider.scrollLeft = sliderPos.left - dx;
}

function clearHintSlider() {
  window.clearInterval(hintInterval);
  window.clearTimeout(hintTimeout);
}
function resetScrollValues() {
  clearHintSlider();
  if (hintInterval === undefined) {
    maxLeft = languageSlider.scrollWidth - languageSlider.clientWidth;
    hintSlider();
  }
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

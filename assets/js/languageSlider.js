const languageSlider = document.querySelector(".intro__languages-slider-cont"),
  languages = document.querySelectorAll(".language"),
  nbOfLang = languages.length,
  langSliderGap = 16;

let focusedLang = 0;
let sliderPos = {
  left: 0,
  x: 0,
};

function dragSlider() {
  languageSlider.addEventListener("mousedown", sliderMouseDown);
  languages.forEach((lang) => {
    languagKeydownHandler(lang);
  });
}

function sliderMouseDown(e) {
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
function languagKeydownHandler(lang) {
  lang.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
      e.preventDefault();
      languages[focusedLang].removeAttribute("tabindex");
      if (e.code == "ArrowLeft") {
        focusedLang -= 1;
        focusedLang = (nbOfLang + focusedLang) % nbOfLang;

        languageSlider.scrollLeft -= languages[0].clientWidth + langSliderGap;
      } else if (e.code == "ArrowRight") {
        focusedLang += 1;
        focusedLang %= nbOfLang;

        languageSlider.scrollLeft += languages[0].clientWidth + langSliderGap;
      }
      languages[focusedLang].setAttribute("tabindex", "0");
      languages[focusedLang].focus();
    }
  });
}
export { dragSlider };

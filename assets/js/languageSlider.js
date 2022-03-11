const languageSlider = document.querySelector(".intro__languages-slider-cont"),
  languages = document.querySelectorAll(".language"),
  nbOfLang = languages.length,
  langSliderGap = 16;

let focusedLang = 0;
let sliderPos = {
  left: 0,
  x: 0,
};

// class dragSlider {
//   constructor(el) {
//     this.el = el;
//     this.focusedLang = 0;
//     this.sliderPos = {
//       left: 0,
//       x: 0,
//     };
//     this.boundSliderMouseDown = this.sliderMouseDown.bind(this);
//     this.el.addEventListener("mousedown", this.boundSliderMouseDown);
//   }
//   sliderMouseDown(e) {
//     this.el.classList.add("mouse-down");
//     this.el.addEventListener("mousemove", this.sliderMouseMove);
//     this.el.addEventListener("mouseup", this.sliderMouseUp);
//     this.el.addEventListener("mouseleave", this.sliderMouseUp);
//     this.sliderPos = {
//       left: this.el.scrollLeft,
//       x: e.clientX,
//     };
//   }
//   sliderMouseUp() {
//     this.el.removeEventListener("mouseleave", this.sliderMouseUp);
//     this.el.removeEventListener("mousemove", this.sliderMouseMove);
//     this.el.removeEventListener("mouseup", this.sliderMouseUp);
//     this.el.classList.remove("mouse-down");
//   }
//   sliderMouseMove(e) {
//     if (e === undefined) return;
//     const dx = (e.clientX - this.sliderPos.x) * 2;
//     this.el.scrollLeft = this.sliderPos.left - dx;
//   }
// }

function startDragSlider() {
  languageSlider.addEventListener("mousedown", sliderMouseDown);
  languages.forEach((lang) => {
    languagKeydownHandler(lang);
  });
  // const slider = new dragSlider(languageSlider);
  // slider.el.addEventListener("mousedown", slider.sliderMouseDown);
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
export { startDragSlider };

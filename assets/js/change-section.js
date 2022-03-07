import { sliderCancelAll } from "./languageSlider.js";
import { setSliderHandler } from "./script.js";

const sectionNavBtns = document.querySelectorAll(".nav__btn");
const sections = document.querySelectorAll("section");
let currentSection = "#home";

export function sectionSwitcher() {
  sectionNavBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sections.forEach((sec) => {
        sec.classList.add("hidden-section");
      });
      currentSection = btn.getAttribute("data-section-id");
      document.querySelector(currentSection).classList.remove("hidden-section");
      if (currentSection != "#home") {
        sliderCancelAll();
      } else {
        setSliderHandler();
      }
    });
  });
}

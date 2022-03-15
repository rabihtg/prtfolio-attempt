const sectionNavBtns = document.querySelectorAll(".nav__btn");
const sections = document.querySelectorAll("section");
let currentSection = "#home";
let oldSection;
let typingTimeOut;

import { startTxtType, stopTxtType } from "./typing-txt-animator.js";

export function sectionSwitcher() {
  sectionNavBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const oldBtn = document.querySelector(".nav__btn.selected");
      oldBtn.classList.remove("selected");
      oldSection = oldBtn.getAttribute("data-section-id");
      btn.classList.add("selected");
      document
        .querySelector("section:not(.hidden-section)")
        .classList.add("hidden-section");
      currentSection = btn.getAttribute("data-section-id");
      document.querySelector(currentSection).classList.remove("hidden-section");
      if (currentSection !== "#home") {
        stopTxtType();
        clearTimeout(typingTimeOut);
      } else if (currentSection === "#home" && oldSection !== "#home") {
        typingTimeOut = setTimeout(() => {
          startTxtType();
          clearTimeout(typingTimeOut);
        }, 2000);
      }
    });
  });
}

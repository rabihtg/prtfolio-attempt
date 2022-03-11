"use strict";
const animatedElms = document.querySelectorAll("[data-animated='true'");
import { startDragSlider } from "./languageSlider.js";
import { sectionSwitcher } from "./change-section.js";
import { startTxtType } from "./typing-txt-animator.js";
window.addEventListener("load", () => {
  animatedElms.forEach((elm) => {
    elm.classList.add("animation");
  });
  startDragSlider();
  window.setTimeout(() => {
    startTxtType();
    sectionSwitcher();
  }, 3000);
});

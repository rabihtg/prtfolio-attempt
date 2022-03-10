"use strict";
const animatedElms = document.querySelectorAll("[data-animated='true'");
import { dragSlider } from "./languageSlider.js";
import { sectionSwitcher } from "./change-section.js";

window.addEventListener("load", () => {
  animatedElms.forEach((elm) => {
    elm.classList.add("animation");
  });
  dragSlider();
  sectionSwitcher();
});

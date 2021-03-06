// Todo - add functionality to see all in loopstudio website.

"use strict";
const animatedElms = document.querySelectorAll("[data-animated='true'");
const homeSection = document.querySelector("#home");
import { startDragSlider } from "./languageSlider.js";
import { sectionSwitcher } from "./change-section.js";
import { startTxtType } from "./typing-txt-animator.js";
import {
  galleryLoader,
  galleryKeyNavigator,
  gallerySlider,
} from "./gallery-loader.js";

window.addEventListener("load", () => {
  animatedElms.forEach((elm) => {
    elm.classList.add("animation");
  });
  startDragSlider();
  window.setTimeout(() => {
    if (!homeSection.classList.contains("hidden-section")) {
      startTxtType();
    }
    sectionSwitcher();
  }, 3000);
  galleryLoader();
  galleryKeyNavigator();
  gallerySlider();
});

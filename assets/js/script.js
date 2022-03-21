// Todo - user-select: none on gallery-item txt (mobile-devices).
// Todo - add functionality to see all in loopstudio website.
// Todo - make home page loading page..add functionality to check selected page and link selected btn acconrdingly.
// Todo - fix font-size for gallery-item txt.
// Todo - re-order gallery-item.js data.
// Todo - check section height code.
// Todo - Fix row & col trace in galleryLoader !important caught bug.

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

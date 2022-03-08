"use strict";
import {
  dragSlider,
  hintSlider,
  windowResizeHandler,
} from "./languageSlider.js";
import { sectionSwitcher } from "./change-section.js";

export { setSliderHandler };

function setSliderHandler() {
  dragSlider();
  hintSlider();
  windowResizeHandler();
}

setSliderHandler();
sectionSwitcher();

const sectionNavBtns = document.querySelectorAll(".nav__btn");
const sections = document.querySelectorAll("section");
let currentSection = "#home";

export function sectionSwitcher() {
  sectionNavBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".nav__btn.selected").classList.remove("selected");
      btn.classList.add("selected");
      document
        .querySelector("section:not(.hidden-section)")
        .classList.add("hidden-section");
      currentSection = btn.getAttribute("data-section-id");
      document.querySelector(currentSection).classList.remove("hidden-section");
    });
  });
}

const galleryCont = document.querySelector(".work__gallery");

let galleryItemAnchors,
  // Flipped because of grid-auto-flow: column;
  nbOfCol = 3,
  nbOfRow = 7,
  currentAnchorIndex = 0,
  col = 0,
  row = 0,
  minWidth = 769,
  emptySquare = [6, 2];

function setWidthBoundVar() {
  if (window.innerWidth < minWidth) {
    (nbOfCol = 4), (nbOfRow = 5), (emptySquare = undefined);
  }
}

export { galleryLoader, galleryKeyNavigator, gallerySlider };
import { data } from "../gallery_items.js";

function galleryLoader() {
  let href, src;
  Object.keys(data).forEach((item) => {
    let galleryItem = document.createElement("div");
    let itemAnchor = document.createElement("a");
    let itemImg = document.createElement("img");
    let textCont = document.createElement("div");
    let itemTitle = document.createElement("h3");
    let itemDesc = document.createElement("p");

    galleryItem.setAttribute("class", "gallery-item");

    href = `https://${data[item].href}.vercel.app`;
    itemAnchor.setAttribute("href", href);
    itemAnchor.setAttribute("rel", "noopener noreferrer");
    itemAnchor.setAttribute("target", "_blank");
    itemAnchor.setAttribute("tabindex", "-1");

    src = `./assets/images/gallery/${data[item].imgSrc}`;
    itemImg.setAttribute("src", src);
    itemImg.setAttribute("class", "gallery-item-img");
    itemImg.setAttribute("alt", data[item].title);
    itemImg.setAttribute("loading", "lazy");

    textCont.setAttribute("class", "gallery-item-txt-cont");

    itemTitle.textContent = data[item].title;
    itemTitle.setAttribute("class", "gallery-item-title");

    itemDesc.textContent = data[item].desc;
    itemDesc.setAttribute("class", "gallery-item-desc");

    galleryCont.appendChild(galleryItem);
    galleryItem.append(itemAnchor);
    itemAnchor.appendChild(itemImg);
    galleryItem.appendChild(textCont);
    textCont.appendChild(itemTitle);
    textCont.appendChild(itemDesc);
  });
  const firsAnchor = document.querySelector(".gallery-item:first-of-type > a");
  galleryItemAnchors = document.querySelectorAll(".gallery-item > a");
  firsAnchor.setAttribute("tabindex", "0");
  setWidthBoundVar();
}

function galleryKeyNavigator() {
  window.addEventListener("resize", resetWidthBoudnVar);
  galleryCont.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        row += 1;
        if (row == nbOfRow) {
          row = 0;
          col += 1;
          col %= nbOfCol;
        }
        if (emptySquare) {
          if (row == emptySquare[0] && col == emptySquare[1]) {
            col = 0;
            row = 0;
          }
        }
        break;
      case "ArrowLeft":
        row -= 1;
        if (row < 0) {
          col -= 1;
          if (col < 0) {
            if (emptySquare) {
              [row, col] = emptySquare;
              row -= 1;
            } else {
              row = nbOfRow - 1;
              col = nbOfCol - 1;
            }
          } else {
            row = nbOfRow - 1;
            col = (nbOfCol + col) % nbOfCol;
          }
        }
        break;
      case "ArrowDown":
        col += 1;
        if (col == nbOfCol) {
          col = 0;
          row += 1;
          row %= nbOfRow;
        }
        if (emptySquare) {
          if (row == emptySquare[0] && col == emptySquare[1]) {
            col = 0;
            row = 0;
          }
        }
        break;
      case "ArrowUp":
        col -= 1;
        if (col < 0) {
          row -= 1;
          if (row < 0) {
            if (emptySquare) {
              [row, col] = emptySquare;
              col -= 1;
            } else {
              row = nbOfRow - 1;
              col = nbOfCol - 1;
            }
          } else {
            col = nbOfCol - 1;
            row = (nbOfRow + row) % nbOfRow;
          }
        }
        break;
    }
    if (e.key != "Enter" && e.key != "Tab" && e.key != "F5") {
      e.preventDefault();
    }
    currentAnchorIndex = row * nbOfCol + col;
    document
      .querySelector(".gallery-item > a[tabindex='0']")
      .setAttribute("tabindex", "-1");
    galleryItemAnchors[currentAnchorIndex].setAttribute("tabindex", "0");
    galleryItemAnchors[currentAnchorIndex].focus();
    galleryItemAnchors[currentAnchorIndex].scrollIntoView({
      inline: "center",
      block: "center",
    });
  });
}

function gallerySlider() {
  galleryCont.addEventListener("wheel", mouseWheelHandler);
}

function mouseWheelHandler(e) {
  e.preventDefault();
  galleryCont.scrollLeft -= e.deltaY;
}
function resetWidthBoudnVar() {
  if (window.innerWidth < minWidth) {
    nbOfRow = 5;
    nbOfCol = 4;
    col = 0;
    row = 0;
    emptySquare = undefined;
  } else {
    nbOfRow = 7;
    nbOfCol = 3;
    col = 0;
    row = 0;
    emptySquare = [6, 2];
    document.querySelector(".gallery-item > a[tabindex='0']").blur();
    document
      .querySelector(".gallery-item > a[tabindex='0']")
      .setAttribute("tabindex", "-1");
    galleryItemAnchors[0].setAttribute("tabindex", "0");
  }
}

const galleryCont = document.querySelector(".work__gallery");

let galleryItemAnchors,
  // Flipped because of grid-auto-flow: column;
  nbOfCol = 3,
  nbOfRow = 7,
  resetIndex = 20,
  currentAnchorIndex = 0,
  galleryContCoor = {
    left: 0,
    x: 0,
  };

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
}

function galleryKeyNavigator() {
  window.addEventListener("resize", () => {
    if (window.innerWidth < 769) {
      nbOfRow = 5;
      nbOfCol = 4;
    } else {
      nbOfRow = 3;
      nbOfCol = 7;
      resetIndex = 20;
    }
  });
  let col = 0,
    row = 0;
  galleryCont.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        row += 1;
        if (row > resetIndex) {
          row = 0;
        }
        break;
      case "ArrowLeft":
        row -= 1;
        if (row < 0) {
          row = galleryItemAnchors.length - 1;
        }
        break;
      case "ArrowDown":
        col += 1;
        if (col > resetIndex) {
          col = 0;
        }
        break;
      case "ArrowUp":
        col -= 1;
        if (col < 0) {
          col = galleryItemAnchors.length - 1;
        }
        break;
    }
    if (e.key != "Enter" && e.key != "Tab") {
      e.preventDefault();
    }
    currentAnchorIndex = (nbOfCol * row + col) % (nbOfCol * nbOfRow - 1);
    galleryItemAnchors[currentAnchorIndex].focus();
    console.log(row, col, currentAnchorIndex);
    document
      .querySelector(".gallery-item > a[tabindex='0']")
      .setAttribute("tabindex", "-1");
    galleryItemAnchors[currentAnchorIndex].setAttribute("tabindex", "0");

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

const galleryCont = document.querySelector(".work__gallery");
import { data } from "../gallery_items.js";

export function galleryLoader() {
  let href;
  let src;
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
}

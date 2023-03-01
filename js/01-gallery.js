import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryItem(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
    })
    .join("");
}

function onGalleryContainerClick(e) {
  e.preventDefault();
  const isGalleryImage = e.target.classList.contains("gallery__image");

  if (!isGalleryImage) {
    return;
  }

  openAndCloseImage(e.target.dataset.source);
}

function openAndCloseImage(card) {
  const instance = basicLightbox.create(`<img src="${card}" width="1280">`);
  instance.show();
  window.addEventListener("keydown", escapePress);
  function escapePress(e) {
    if (e.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", escapePress);
    }
  }
}
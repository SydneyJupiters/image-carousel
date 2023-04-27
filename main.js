// grab elements from DOM, list of images, buttons, etc.
const elementsFromDOM = {
  carousel: document.getElementById("carousel"),
  carouselList: document.querySelector("#carousel ul"),
  galleryImages: Array.from(document.querySelectorAll("#carousel li")),
  prevSlide: document.querySelector(".fa-chevron-left"),
  nextSlide: document.querySelector(".fa-chevron-right"),
};

// set things that can be altered
const configuration = {
  imgDisplayTime: 5000, // set duration to 5 seconds
  animationTime: 1500, // set animation duration to 1.5 sec
  easing: "ease-out", // set easing options
};

const otherSettings = {
  startPosition: 0,
  endPosition: elementsFromDOM.galleryImages[0].offsetWidth, // value equal to image width set in css file
  galleryImagesCount: elementsFromDOM.galleryImages.length,
  displayedImageIndex: 0,
  isAnimating: false,
};

// get image gallery length (sum of all images width)
const galleryLength =
  otherSettings.endPosition * otherSettings.galleryImagesCount;

const showNextImage = () => {
  let gallery = elementsFromDOM.galleryImages;
  let elList = elementsFromDOM.carouselList;
  elList.style.marginLeft = `-${otherSettings.endPosition}px`;
  const firstElem = gallery.shift();
  elList.removeChild(firstElem);
  elList.style.marginLeft = `${otherSettings.startPosition}px`;
  gallery.push(firstElem);
  elList.insertAdjacentElement("beforeend", firstElem);
  return gallery;
};

const showPrevImage = () => {
  let gallery = elementsFromDOM.galleryImages;
  let elList = elementsFromDOM.carouselList;
  const lastElem = gallery.pop();
  elList.removeChild(lastElem);
  gallery.unshift(lastElem);
  elList.insertAdjacentElement("afterbegin", lastElem);
  elList.style.marginLeft = `${otherSettings.startPosition}px`;
  return gallery;
};

{
  setInterval(() => {
    showNextImage();
  }, configuration.imgDisplayTime);
}

elementsFromDOM.prevSlide.addEventListener("click", showPrevImage);
elementsFromDOM.nextSlide.addEventListener("click", showNextImage);

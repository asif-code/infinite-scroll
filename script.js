const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
let count = 5;
const apiKey = "3BDEvS52gvR9YbLFDytRJEmb8t_cAKpfPWxrGhp4A1k";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//  check if all images are loaded
function imageLoader() {
  imageLoaded++;
  if (imageLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for link, photos and add to the dom
function displayPhotos() {
  imageLoaded = 0;
  totalImages = photosArray.length;
  // run functions for each object in photos array
  photosArray.forEach((photo) => {
    // creating a <a> to link unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create img for photos
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // event listener, check when each is load
    img.addEventListener("load", imageLoader);
    // put <img> inside <a> then put both in imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// check to see if scrolling near bottom of the page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();

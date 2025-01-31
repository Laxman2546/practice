const clientId = "7Na26a7NvIv5kvf6iOejRGmltqyiecttLY_1RawWyNA";
const UNSPLASH_ROOT = "https://api.unsplash.com";
const findImage = document.querySelector(".images");
const inputtext = document.querySelector(".inputtext");
const submit = document.querySelector(".submit");
const random = document.querySelector(".randomimages");
const showmore = document.querySelector(".showmore");
showmore.classList.add("display");
let page = 1;
let currentQuery = "";
submit.addEventListener("click", () => {
  const value = inputtext.value;
  if (value) {
    currentQuery = value;
    page = 1;
    findImages(currentQuery, page);
    clearinput();
  }
});
const clearinput = () => {
  inputtext.value = "";
};
const randomquery = () => {
  currentQuery = "random";
  page = 1;
  findImages(currentQuery, page);
};
random.addEventListener("click", () => {
  currentQuery = "random";
  page = 1;
  findImages(currentQuery, page);
});

const findImages = (currentQuery, page) => {
  const url = `${UNSPLASH_ROOT}/search/photos?query=${currentQuery}&client_id=${clientId}&per_page=10&page=${page}`;
  images(url, page);
};
async function images(url, page) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const container = document.getElementById("imageContainer");
  const results = data.results;
  if (page === 1) {
    container.innerHTML = "";
  }
  results.forEach((result) => {
    const img = document.createElement("img");
    img.src = result.urls.regular;
    img.alt = "Image";
    img.style.height = "300px";
    container.appendChild(img);
  });
  page++;
  if (page > 1) {
    showmore.classList.remove("display");
  }
}
showmore.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentQuery) {
    page++;
    findImages(currentQuery, page);
  }
});

randomquery();

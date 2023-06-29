import { createApi } from "unsplash-js";
// import "whatwg-fetch";

const formSearch = document.querySelector(".search-form");
const inputSearch = document.querySelector("#search-input");
const btnForm = document.querySelector("#btn-form");
const galeryContainer = document.querySelector("#galery-container");
const inicioBTN = document.querySelector("#btn-inicio");

const unsplash = createApi({
  accessKey: "zE2nMcW2zozCcXA04Wbjv9Dcxui_1YG9y_IHhrxc-xI",
});

const isEmpty = () => {
  if (inputSearch.value === "") {
    alert("Busqueda vacía");
    return;
  }
};

const searchPhotos = async (e) => {
  const value = inputSearch.value;
  const response = await unsplash.search.getPhotos({
    query: value,
    page: 1,
    perPage: 10,
  });
  try {
    const photos = response.response.results;

    photos.forEach((photo) => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = `
        <img src="${photo.urls.regular}" alt="${photo.alt_description}">
      `;
      galeryContainer.appendChild(item);
    });
  } catch (error) {
    console.error(error);
  }
};

const showBtnDelete = () => {
  if (inputSearch.value === "") {
    return;
  }
  inicioBTN.style.display = "block";
};

const btnFormClicked = (e) => {
  // PREVENT DEFAULT
  e.preventDefault();

  // CHECK IF INPUT IS EMPTY
  if (isEmpty()) {
    return;
  }

  searchPhotos(e);

  showBtnDelete();

  // CLEAN GALERY
  galeryContainer.innerHTML = "";

  // CLEAN INPUT
  inputSearch.value = "";
};

const inicioBtnClicked = () => {
  galeryContainer.innerHTML = "";
  inicioBTN.style.display = "none";
};

const init = () => {
  btnForm.addEventListener("click", btnFormClicked);
  inicioBTN.addEventListener("click", inicioBtnClicked);
};

init();

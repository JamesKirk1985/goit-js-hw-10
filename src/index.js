// console.log('Hello World!');
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breadSelectElement = document.querySelector('.breed-select');
const catInfoElement = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

breadSelectElement.hidden = true;
errorElement.hidden = true;
fetchBreeds()
  .then(ans => breedsList(ans))
  .catch(error => {
    console.log(error);
    errorElement.hidden = false;
  })
  .finally(() => {
    loaderElement.hidden = true;
    breadSelectElement.hidden = false;
  });

breadSelectElement.addEventListener('change', handlerClick);

function breedsList(ans) {
  const markup = ans
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breadSelectElement.innerHTML = markup;
}
function handlerClick(evt) {
  loaderElement.hidden = false;
  errorElement.hidden = true;
  fetchCatByBreed(evt.target.value)
    .then(info => catInfoMarkup(info))
    .catch(error => {
      errorElement.hidden = false;
      console.log(error);
    })
    .finally(() => {
      loaderElement.hidden = true;
    });
}
function catInfoMarkup([info]) {
  const markup = `<img src="${info.url}" width="300" alt="photo of a cat breed${info.breeds[0].name}" />
      <h2>${info.breeds[0].name}</h2>
      <p>${info.breeds[0].description}</p>
      <p><span><b>Temperament:</b></span> ${info.breeds[0].temperament}</p>`;
  catInfoElement.innerHTML = markup;
}

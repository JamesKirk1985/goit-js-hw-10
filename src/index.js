import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import { Report } from 'notiflix/build/notiflix-report-aio';

const breadSelectElement = document.querySelector('.breed-select');
const catInfoElement = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');

breadSelectElement.hidden = true;

fetchBreeds()
  .then(ans => breedsList(ans))
  .then(() => {
    breadSelectElement.hidden = false;
  })
  .catch(error => {
    Report.failure(
      'Oops! Something went wrong! Try reloading the page!',
      '',
      'OK'
    );
    breadSelectElement.hidden = true;
  })
  .finally(() => {
    loaderElement.hidden = true;
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

  catInfoElement.innerHTML = '';
  fetchCatByBreed(evt.target.value)
    .then(info => catInfoMarkup(info))
    .catch(error => {
      Report.failure(
        'Oops! Something went wrong! Try reloading the page!',
        '',
        'OK'
      );
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

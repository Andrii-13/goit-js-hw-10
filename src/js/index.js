import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { elem } from './refs';

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const { selectEl, catInfo, errorEl, loaderEl, loaderTextEl } = elem;

fetchBreeds()
  .then(resp => {
    selectEl.classList.remove('visually-hidden');
    loaderEl.classList.add('visually-hidden');
    loaderTextEl.classList.add('visually-hidden');
    createMarkup(resp);
  })
  .catch(error => {
    loaderEl.classList.add('visually-hidden');
    loaderTextEl.classList.add('visually-hidden');
    selectEl.classList.add('visually-hidden');
    errorEl.classList.remove('visually-hidden');
    Notiflix.Notify.failure(errorEl.textContent);
  });

function createMarkup(arr) {
  const optionEl = arr
    .map(
      ({ id, name }) => `<option class = "cat" value="${id}">${name}</option>`
    )
    .join('');
  selectEl.insertAdjacentHTML('beforeend', optionEl);
  new SlimSelect({
    select: selectEl,
    settings: {
      openPosition: 'down', // 'auto', 'up' or 'down'
    },
  });
}

selectEl.addEventListener('change', handlerCat);

function handlerCat(e) {
  errorEl.classList.add('visually-hidden');
  loaderEl.classList.remove('visually-hidden');
  loaderTextEl.classList.remove('visually-hidden');
  catInfo.classList.add('visually-hidden');
  fetchBreeds().then(resp => {
    const { reference_image_id } = resp.find(({ id }) => id === e.target.value);
    fetchCatByBreed(reference_image_id)
      .then(value => (catInfo.innerHTML = createMurkupInstanceCat(value)))
      .catch(error => {
        errorEl.classList.remove('visually-hidden');
        Notiflix.Notify.failure(errorEl.textContent);
      })
      .finally(() => {
        loaderEl.classList.add('visually-hidden');
        loaderTextEl.classList.add('visually-hidden');
        catInfo.classList.remove('visually-hidden');
      });
  });
}

function createMurkupInstanceCat({ breeds, url }) {
  return ` <div>
  <img src="${url}" alt="${breeds.map(({ name }) => name)}" width = "300"></div>
  <div class="cat-information">
    <h2 class="title">${breeds.map(({ name }) => name)}</h2>
    <p class="description">${breeds.map(({ description }) => description)}</p>
    <h3 class="temperament">Temperament:</h3>
    <span class="description">${breeds.map(
      ({ temperament }) => temperament
    )}</span>
  
</div>`;
}

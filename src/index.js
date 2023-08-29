import { fetchBreeds, fetchCatByBreed, fetchCat } from './cat-api';
import { elem } from './refs';

import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const { selectEl, catInfo, loaderEl ,loaderTextEl} = elem;



selectEl.classList.add('visually-hidden');
loaderEl.classList.remove('visually-hidden');
loaderTextEl.classList.remove('visually-hidden');

fetchBreeds().then(resp => {
  createMarkup(resp);
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
      openPosition: 'auto' // 'auto', 'up' or 'down'
    }
  })
  selectEl.classList.remove('visually-hidden');
  loaderEl.classList.add('visually-hidden');
  loaderTextEl.classList.add('visually-hidden');
}

selectEl.addEventListener('change', handlerCat);

function handlerCat(e) {
  loaderEl.classList.remove('visually-hidden');
  loaderTextEl.classList.remove('visually-hidden');
  catInfo.classList.add('visually-hidden')
  fetchCatByBreed(e.target.value).then(data =>
    data.map(({ id }) => {
      fetchCat(id)
        .then(value => (catInfo.innerHTML = createMurkupInstanceCat(value)))
        .finally(() => {
          loaderEl.classList.add('visually-hidden');
          loaderTextEl.classList.add('visually-hidden');
          catInfo.classList.remove('visually-hidden');
        });
    })
  );
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

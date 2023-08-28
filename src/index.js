import { fetchBreeds, fetchCatByBreed, fetchCat } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

// console.log(selectEl);

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
}

selectEl.addEventListener('change', handlerCat);

function handlerCat(e) {
  fetchCatByBreed(e.target.value).then(data =>
    data.map(({ id }) => {
      fetchCat(id).then(
        value => (catInfo.innerHTML = createMurkupInstanceCat(value))
      );
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

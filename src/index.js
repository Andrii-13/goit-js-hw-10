import { fetchBreeds, fetchCatByBreed, fetchCat } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

console.log(selectEl);

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
      fetchCat(id).then(value => catInfo.innerHTML = createMurkupInstanceCat(value));
    })
  );
}

function createMurkupInstanceCat(breeds) {
  return ` <div class="cat-info">
  <img src="${breeds.url}" alt="" width = "300">
  <div class="cat-information">   
</div>`;
}

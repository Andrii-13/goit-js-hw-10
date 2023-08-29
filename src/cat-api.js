// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_mye044TqDGd7C2kKYclUMX2fGyrdn4mufug3Nw2qAIdAiNI07c5VLd8fYptvXDPT';



import { elem } from "./refs";
import Notiflix from 'notiflix';


const {selectEl, errorEl, loaderEl ,loaderTextEl} = elem;

const refs = {
  BASE_URL: 'https://api.thecatapi.com/v1',
  END_POINT: '/breeds',
  END_POINT_IMG: '/images/search',
  API_KEY:
    'live_mye044TqDGd7C2kKYclUMX2fGyrdn4mufug3Nw2qAIdAiNI07c5VLd8fYptvXDPT',
};

export function fetchBreeds() {
  return fetch(`${refs.BASE_URL}${refs.END_POINT}?${refs.API_KEY}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  ).catch(error => {
    loaderEl.classList.add('visually-hidden');
    loaderTextEl.classList.add('visually-hidden');
    selectEl.classList.add('visually-hidden');
    errorEl.classList.remove('visually-hidden');

    Notiflix.Notify.failure(errorEl.textContent);
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${refs.BASE_URL}${refs.END_POINT_IMG}?breed_ids=${breedId}&${refs.API_KEY}`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error(responce.status);
      }
      return resp.json();
    }).catch(error => {
      selectEl.classList.add('visually-hidden');
      errorEl.classList.remove('visually-hidden');
  
      Notiflix.Notify.failure(errorEl.textContent);
    });
    
}

export function fetchCat(id) {
  return fetch(`${refs.BASE_URL}/images/${id}`).then(resp => {
    if (!resp.ok) {
      throw new Error(responce.status);
    }
    return resp.json();
  }).catch(error => {
    selectEl.classList.add('visually-hidden');
    errorEl.classList.remove('visually-hidden');

    Notiflix.Notify.failure(errorEl.textContent);
  });
}

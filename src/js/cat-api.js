// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_mye044TqDGd7C2kKYclUMX2fGyrdn4mufug3Nw2qAIdAiNI07c5VLd8fYptvXDPT';

const refs = {
  BASE_URL: 'https://api.thecatapi.com/v1',
  END_POINT: '/breeds',
  END_POINT_IMG: '/images/',
  API_KEY:
    'live_mye044TqDGd7C2kKYclUMX2fGyrdn4mufug3Nw2qAIdAiNI07c5VLd8fYptvXDPT',
};

//fetchBreeds - виконує HTTP-запит і повертає проміс із масивом порід
export function fetchBreeds() { 
  return fetch(`${refs.BASE_URL}${refs.END_POINT}?${refs.API_KEY}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
     return resp.json();
    });
}

//fetchCatByBreed - робить HTTP-запит і повертає проміс із даними про кота
export function fetchCatByBreed(breedId) {
  return fetch(
    `${refs.BASE_URL}${refs.END_POINT_IMG}${breedId}?${refs.API_KEY}`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    })
}

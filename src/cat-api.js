function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }
    return response.json();
  });
}

const options = {
  headers: {
    'x-api-key':
      'live_OzL7vqnE23x8DTQfoUmB3LPH25vzpJAMSzISKph4jwUoTt8GmynvOIYjYCwj7SCN',
  },
};

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    options
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };

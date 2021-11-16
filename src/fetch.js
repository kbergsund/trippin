import { retrieveData } from './scripts';

const addTripForm = document.querySelector('#add-trip-form');
const errorField = document.querySelector('h1');

const fetchData = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
    .then(response => response.json())
    .catch(error => showError(error)) 
}

const postData = (tripDetails, userID) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(tripDetails),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkForErrors(response))
    .then(() => {
      addTripSuccess();
      retrieveData(userID)
    })
    .catch(error => showError(error));
}

const checkForErrors = (response) => {
  if (!response.ok) {
    throw new Error('POST unsuccessful')
  }
  return response.json()
}

const showError = (error) => {
  if (error.message === 'Failed to fetch') {
    errorField.innerText = 'Error loading. Have you started the local server?';
  } else if (error.message === 'POST unsuccessful') {
    addTripForm.childNodes[3].innerText = 'Something went wrong. Try again!';
  } else {
    errorField.innerText = `${error.message}`;
  }
}

const addTripSuccess = () => {
  addTripForm.childNodes[3].innerText = `Trip successfully requested!`;
}

export {
  fetchData,
  postData
}
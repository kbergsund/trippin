import { retrieveData } from './scripts';

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
    .then(() => retrieveData(userID))
    .catch(error => showError(error));
}

const checkForErrors = (response) => {
  if (!response.ok) {
    throw new Error('Something went wrong. Try again!')
  }
  return response.json()
}

const showError = (error) => {
  const errorField = document.querySelector('h1')
  if (error.message === 'Failed to fetch') {
    errorField.innerText = 'Error loading! Have you started the local server?';
  } else {
    errorField.innerText = `${error.message}`
  }
}

export {
  fetchData,
  postData
}
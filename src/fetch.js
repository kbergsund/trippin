const fetchData = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
    .then(response => response.json())
    .catch(() => 
      document.querySelector('h1').innerText = 'Error loading! Try again.');
}

export {
  fetchData
}
const fetchData = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
  .then(response => response.json());
}

export {
  fetchData
}
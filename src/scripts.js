import './css/base.scss';
import './images/mountains-tanyadzu.png';
import './images/user.svg';
import { fetchData, postData } from './fetch';
import TravelerRepo from './TravelerRepo'
const dayjs = require('dayjs');
import { pageLoadLoginDisplay, generateDOM } from './domManipulation';

// Global Variable
let travelerRepo;

const retrieveData = (id) => {
  Promise.all(
    [fetchData(`travelers/${id}`), fetchData('trips'),
      fetchData('destinations')]
  ).then(data => {
    buildTravelerRepo(
      data[0], 
      Object.values(data[1]).flat(), 
      Object.values(data[2]).flat());
    generateDOM(travelerRepo);
  })
}

const buildTravelerRepo = (travelerData, tripData, destinationData) => {
  travelerRepo = 
    new TravelerRepo(travelerData, tripData, destinationData);
  travelerRepo.buildTravelers();
}

const addTripForm = document.querySelector('#add-trip-form');

addTripForm.addEventListener('submit', (event) => {
  addTrip(event);
});

const formatFormValues = () => {
  const elementIndexes = Object.keys(addTripForm.elements);
  elementIndexes.splice(4, 4);
  const formValues = elementIndexes.reduce((acc, number)=> {
    if (addTripForm.elements[number].value === 'Destinations') {
      acc.push('')
    } else {
      acc.push(addTripForm.elements[number].value);
    }
    return acc;
  }, [])
  if (formValues[1].length > 0) {
    formValues[1] = dayjs(formValues[1]).format('YYYY/MM/DD')
  }
  return formValues;
}

function addTrip(e) {
  e.preventDefault();
  const trip = travelerRepo.prepareTripDetails(formatFormValues())
  postData(trip, travelerRepo.currentTraveler.id);
  addTripForm.reset();
  setTimeout(() => {
    addTripForm.childNodes[3].innerText = ``;
    addTripForm.childNodes[3].style.backgroundColor = 'transparent';
  }, 2000);
}

pageLoadLoginDisplay();

export {
  retrieveData,
  formatFormValues,
  travelerRepo
}
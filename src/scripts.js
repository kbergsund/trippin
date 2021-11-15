import './css/base.scss';
import './images/mountains-tanyadzu.png';
import './images/user.svg';
import { fetchData, postData } from './fetch';
import TravelerRepo from './TravelerRepo'
const dayjs = require('dayjs');

// Global Variable
let travelerRepo;

const retrieveData = () => {
  Promise.all(
    [fetchData('travelers'), fetchData('trips'), fetchData('destinations')]
  ).then(data => {
    buildTravelerRepo(
      Object.values(data[0])[0], 
      Object.values(data[1]).flat(), 
      Object.values(data[2]).flat());
    generateDOM();
  })
}

const buildTravelerRepo = (travelerData, tripData, destinationData) => {
  travelerRepo = 
    new TravelerRepo(travelerData, tripData, destinationData);
  travelerRepo.buildTravelers();
}

// DOM MANIPULATION

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length + 1);
};

// Query Selectors
const userDropdown = document.querySelector('#dropdownContent');
const currentTrip = document.querySelector('#currentTrip');
const tripCategories = document.querySelector('#tripCategories')
const upcoming = document.querySelector('#upcoming');
const past = document.querySelector('#past');
const pending = document.querySelector('#pending');
const addTripForm = document.querySelector('#add-trip-form');
const formDestinations = document.querySelector('#destinations');
const formCalendar = document.querySelector('#calendar');

// Event Listeners
tripCategories.addEventListener('change', toggleTripView);
addTripForm.addEventListener('keyup', checkFormValues);
addTripForm.addEventListener('change', checkFormValues);
addTripForm.addEventListener('submit', (event) => {
  addTrip(event);
});

// Event Handlers
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

function checkFormValues() {
  const formValues = formatFormValues();
  console.log(formValues);
  if (travelerRepo.estimateTripCost(formValues)) {
    addTripForm.childNodes[3].innerText = 
      `Estimated Total Cost: ~$${travelerRepo.estimateTripCost(formValues)}`
  }
}

function addTrip(e) {
  e.preventDefault();
  const trip = travelerRepo.prepareTripDetails(formatFormValues())
  postData(trip);
  addTripForm.reset();
  // ADD SUCCESS MESSAGING
  addTripForm.childNodes[3].innerText = ``
}

// Functions
const generateDOM = () => {
  const randomID = getRandomIndex(travelerRepo.allTravelers);
  travelerRepo.retrieveTraveler(3);
  const traveler = travelerRepo.currentTraveler
  console.log(travelerRepo.currentTraveler);
  restrictCalendarMinDate();
  generateFormDestinations();
  displayUserInfo(traveler);
  displayCurrentTrip(traveler);
  generateTripCards(traveler);
  toggleTripView();
}

const displayUserInfo = (traveler) => {
  userDropdown.innerHTML = `
  <p>${traveler.name}</p>
  <p>I am a: ${traveler.travelerType}</p>
  <p>2021 Total Spend: $${traveler.myTrips.calculateTotalCostThisYear()}<p>
  `
}

const displayCurrentTrip = (traveler) => {
  // Not Tested!
  if (traveler.myTrips.categorizedTrips.present.length > 0) {
    const currentDestination = traveler.myTrips.categorizedTrips.present[0];
    currentTrip.childNodes[3].innerHTML = `
    <h3>${currentDestination.destinationID}<h3>
    <p>${dayjs(currentDestination.date)
    .format('M/D/YYYY')}, ${currentDestination.duration} days<p>
    `
  } else {
    currentTrip.childNodes[3].innerHTML = '<p>You\'re not currently traveling. Time to book a trip!<p>'
  }
}

const generateTripCards = (traveler) => {
  const myTripCategories = Object.keys(traveler.myTrips.categorizedTrips);
  myTripCategories.splice(2, 1);
  myTripCategories.forEach(category => {
    if (!traveler.myTrips.categorizedTrips[category].length) {
      window[category].innerHTML = `
       <p>You don't have any ${category} trips!</p>
       `
    } else {
      window[category].innerHTML = '';
      traveler.myTrips.categorizedTrips[category].forEach(trip => {
        window[category].innerHTML += `
        <section id="${trip.id}">
          <div class="trip-info">
            <h3>${trip.destination}</h3>
            <p>${dayjs(trip.date).format('M/D/YYYY')}, ${trip.duration} days<p>
            <p>${trip.travelers} travelers</p>
          </div>
        </section>
        `
        addBackgroundImage(trip.id, trip.image)
      })
    }
  })
}

const addBackgroundImage = (id, img) => {
  const styles = {
    'background-image': `url(${img}`,
    'background-size': 'cover',
    'background-position': 'center',
    'filter': 'grayscale(100%)',
    'color': '#000'
  }
  const tripSection = document.getElementById(`${id}`);
  Object.assign(tripSection.style, styles);
} 

const restrictCalendarMinDate = () => {
  formCalendar.min = new Date().toISOString().substr(0, 10);
}

const generateFormDestinations = () => {
  travelerRepo.allDestinations.forEach(destination => {
    formDestinations.innerHTML += `
    <option>${destination.destination}</option>
    `
  })
}

function toggleTripView() {
  switch (tripCategories.value) {
  case 'upcoming':
    upcoming.style.display = 'grid';
    past.style.display = 'none';
    pending.style.display = 'none';
    break;
  case 'past':
    upcoming.style.display = 'none';
    past.style.display = 'grid';
    pending.style.display = 'none';
    break;
  case 'pending':
    upcoming.style.display = 'none';
    past.style.display = 'none';
    pending.style.display = 'grid';
    break;
  }
}

retrieveData();

export {
  retrieveData
}
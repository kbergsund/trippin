import './css/base.scss';
import './images/mountains-tanyadzu.png';
import './images/user.svg';
import { fetchData } from './fetch';
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
const formCalendar = document.querySelector('#calendar');

// Event Listeners
tripCategories.addEventListener('change', toggleTripView);
addTripForm.addEventListener('keyup', checkFormValues);
addTripForm.addEventListener('submit', (event) => {
  addTrip(event);
});

// Event Handlers
function checkFormValues() {
  const elementIndexes = Object.keys(addTripForm.elements);
  elementIndexes.splice(4, 3);
  const formValues = elementIndexes.reduce((acc, number)=> {
    acc.push(addTripForm.elements[number].value);
    return acc;
  }, [])
  console.log(formValues);
  if (travelerRepo.estimateTripCost(formValues)) {
    addTripForm.childNodes[3].innerText = 
      `Estimated Total Cost: ~$${travelerRepo.estimateTripCost(formValues)}`
  }
}

function addTrip(e) {
  e.preventDefault();
  addTripForm.reset();
  addTripForm.childNodes[3].innerText = ``
  console.log('submitted');
  // tripDetails = {
  //   destination: tripDetails[0],
  //   date: dayjs(tripDetails[1]).format('YYYY/MM/DD'),
  //   duration: tripDetails[2],
  //   travelers: tripDetails[3]
  // }
  // console.log(tripDetails);
  // map tripDetails to correct trip format for posting.
  // call postData method with tripDetails argument
  // where will we update and then add it to travelers' pending trips?
}

// Functions
const generateDOM = () => {
  const randomID = getRandomIndex(travelerRepo.allTravelers);
  travelerRepo.retrieveTraveler(3);
  const traveler = travelerRepo.currentTraveler
  console.log(travelerRepo.currentTraveler);
  restrictCalendarMinDate();
  displayUserInfo(traveler);
  displayCurrentTrip(traveler);
  generateTrips(traveler);
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
    const currentDestination = traveler.myTrips.categorizedTrips.present[0]
    currentTrip.childNodes[3].innerHTML = `
    <h3>${currentDestination.destinationID}<h3>
    <p>${dayjs(currentDestination.date)
    .format('M/D/YYYY')}, ${currentDestination.duration} days<p>
    `
  } 
}

const generateTrips = (traveler) => {
  // console.log(traveler.myTrips.categorizedTrips);
  const myTripCategories = Object.keys(traveler.myTrips.categorizedTrips);
  // refactor method/test so that present is first? Annoyed by this splice.
  myTripCategories.splice(2, 1);
  myTripCategories.forEach(category => {
    if (!traveler.myTrips.categorizedTrips[category].length) {
      window[category].innerHTML = `
       <p>You don't have any ${category} trips!</p>
       `
    } else {
      traveler.myTrips.categorizedTrips[category].forEach(trip => {
        window[category].innerHTML += `
        <section id="${trip.id}">
          <div class="trip-info">
            <h3>${trip.destination}</h3>
            <p>${dayjs(trip.date).format('M/D/YYYY')}, ${trip.duration} days<p>
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

function toggleTripView() {
  switch (tripCategories.value) {
  case 'upcoming':
    upcoming.style.display = 'block';
    past.style.display = 'none';
    pending.style.display = 'none';
    break;
  case 'past':
    upcoming.style.display = 'none';
    past.style.display = 'block';
    pending.style.display = 'none';
    break;
  case 'pending':
    upcoming.style.display = 'none';
    past.style.display = 'none';
    pending.style.display = 'block';
    break;
  }
}

retrieveData();
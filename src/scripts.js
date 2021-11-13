import './css/base.scss';
import './images/mountains-tanyadzu.png';
import './images/user.svg';
import { fetchData } from './fetch';
import TravelerRepo from './TravelerRepo'
const dayjs = require('dayjs');


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
  // .then(() => generateDOM())
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

const userDropdown = document.querySelector('#dropdownContent');
const currentTrip = document.querySelector('#currentTrip');
const tripCategories = document.querySelector('#tripCategories')
const upcoming = document.querySelector('#upcoming');
const past = document.querySelector('#past');
const pending = document.querySelector('#pending');

tripCategories.addEventListener('change', toggleTripView);

const generateDOM = () => {
  const randomID = getRandomIndex(travelerRepo.allTravelers);
  travelerRepo.retrieveTraveler(randomID);
  const traveler = travelerRepo.currentTraveler
  console.log(travelerRepo.currentTraveler);
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
  console.log(traveler.myTrips.categorizedTrips);
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
        <section>
          <div class="trip-info">
            <h3>${trip.destination}</h3>
            <p>${dayjs(trip.date).format('M/D/YYYY')}, ${trip.duration} days<p>
          </div>
        </section>
        `
      })
    }
  })
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
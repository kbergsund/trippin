import './css/base.scss';
import './images/mountains-tanyadzu.png';
import './images/user.svg';
import { fetchData } from './fetch';
import TravelerRepo from './TravelerRepo'

let travelerRepo;

const retrieveData = () => {
  Promise.all(
    [fetchData('travelers'), fetchData('trips'), fetchData('destinations')]
  ).then(data => {
    buildTravelerRepo(
      Object.values(data[0])[0], 
      Object.values(data[1]).flat(), 
      Object.values(data[2]).flat());
    renderDOM();
  })
  // .then(() => renderDOM())
}

const buildTravelerRepo = (travelerData, tripData, destinationData) => {
  travelerRepo = 
    new TravelerRepo(travelerData, tripData, destinationData);
  travelerRepo.buildTravelers();
}

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

const renderDOM = () => {
  const randomID = getRandomIndex(travelerRepo.allTravelers);
  travelerRepo.retrieveTraveler(28);
  const traveler = travelerRepo.currentTraveler
  console.log(travelerRepo.currentTraveler);
  displayUserInfo(traveler);
  displayCurrentTrip(traveler);
  displayTrips(traveler);
  toggleTripView();
}

const displayUserInfo = (traveler) => {
  userDropdown.innerHTML = `
  <p>${traveler.name}</p>
  <p>I am a: ${traveler.travelerType}</p>
  <p>2021 Total Spend: $${traveler.myTrips.calculateTotalCostThisYear()}<p>
  `
}

// Not Tested!
const displayCurrentTrip = (traveler) => {
  console.log(traveler.myTrips.categorizedTrips.present);
  if (traveler.myTrips.categorizedTrips.present.length > 0) {
    const currentDestination = traveler.myTrips.categorizedTrips.present[0].destinationID
    currentTrip.childNodes[3].innerHTML = `
    <h3>${currentDestination}<h3>
    `
    // <p> element for start date & duration?
  } 
}
const displayTrips = (traveler) => {

}

function toggleTripView(traveler) {
  console.log(tripCategories.value)
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
const dayjs = require('dayjs');
import { retrieveData, formatFormValues, travelerRepo } from './scripts'

// Query Selectors
const userDropdown = document.querySelector('#dropdownContent');
const currentTrip = document.querySelector('#currentTrip');
const tripCategories = document.querySelector('#tripCategories')
const upcoming = document.querySelector('#upcoming');
const past = document.querySelector('#past');
const pending = document.querySelector('#pending');
const addTripForm = document.querySelector('#add-trip-form');
const tripFormDestinations = document.querySelector('#destinations');
const tripFormCalendar = document.querySelector('#calendar');
const travelerLogin = document.querySelector('#login');
const header = document.querySelector('header');
const main = document.querySelector('main');
const loginError = document.querySelector('#loginError')

// Event Listeners
tripCategories.addEventListener('change', toggleTripView);
addTripForm.addEventListener('keyup', displayCostEstimate);
addTripForm.addEventListener('change', displayCostEstimate);
// addTripForm.addEventListener('submit', (event) => {
//   addTrip(event);
// });
travelerLogin.addEventListener('submit', (event) => {
  checkLogin(event);
});

// Event Handlers
function checkLogin(e) {
  e.preventDefault();
  const username = travelerLogin.elements[0].value;
  const splitUsername = username.split('r');
  const userID = parseInt(splitUsername[2]);
  const password = travelerLogin.elements[1].value;
  if (username.substring(0, 8) === 'traveler' && password === 'travel'
    && userID > 0 && userID <= 50) {
    header.style.display = 'flex';
    main.style.display = 'block';
    travelerLogin.style.display = 'none';
    retrieveData(userID);
  } else {
    travelerLogin.reset();
    loginError.innerText = 'Incorrect username or password. Please try again.'
  }
}

function displayCostEstimate() {
  const formValues = formatFormValues();
  if (travelerRepo.estimateTripCost(formValues)) {
    addTripForm.childNodes[3].innerText = 
      `Estimated Total Cost: $${travelerRepo.estimateTripCost(formValues)}`
    addTripForm.childNodes[3].style.backgroundColor = '#fff';
  }
}

// function addTrip(e) {
//   e.preventDefault();
//   const trip = travelerRepo.prepareTripDetails(formatFormValues())
//   postData(trip, travelerRepo.currentTraveler.id);
//   addTripForm.reset();
//   setTimeout(() => {
//     addTripForm.childNodes[3].innerText = ``;
//     addTripForm.childNodes[3].style.backgroundColor = 'transparent';
//   }, 2000);
// }

// Functions
function pageLoadLoginDisplay() {
  console.log(header.style.display)
  header.style.display = 'none';
  main.style.display = 'none';
}

const generateDOM = () => {
  const traveler = travelerRepo.currentTraveler;
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
  tripFormCalendar.min = new Date().toISOString().substr(0, 10);
}

const generateFormDestinations = () => {
  travelerRepo.allDestinations.forEach(destination => {
    tripFormDestinations.innerHTML += `
    <option>${destination.destination}</option>
    `
  })
}

// const formatFormValues = () => {
//   const elementIndexes = Object.keys(addTripForm.elements);
//   elementIndexes.splice(4, 4);
//   const formValues = elementIndexes.reduce((acc, number)=> {
//     if (addTripForm.elements[number].value === 'Destinations') {
//       acc.push('')
//     } else {
//       acc.push(addTripForm.elements[number].value);
//     }
//     return acc;
//   }, [])
//   if (formValues[1].length > 0) {
//     formValues[1] = dayjs(formValues[1]).format('YYYY/MM/DD')
//   }
//   return formValues;
// }

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

export {
  pageLoadLoginDisplay,
  generateDOM
}
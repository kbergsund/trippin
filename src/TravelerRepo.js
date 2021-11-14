import Traveler from './Traveler';
const dayjs = require('dayjs');

export default class TravelerRepo {
  constructor(travelerData, tripData, destinationData) {
    this.allTravelers = travelerData;
    this.allTrips = tripData;
    this.allDestinations = destinationData;
  }

  updateTrips() {
    this.allTrips.map(trip => {
      const destination = this.allDestinations
        .find(destination => destination.id === trip.destinationID)
      console.log(destination);
      Object.keys(destination).forEach(property => {
        if (property !== 'id') {
          trip[property] = destination[property];
        }
      })
      console.log(destination);
    })
  }

  retrieveTravelersTrips(userID) {
    return this.allTrips.filter(trip => trip.userID === userID);
  }

  buildTravelers() {
    this.updateTrips();
    this.allTravelers = this.allTravelers.map(traveler => {
      return new Traveler(traveler, this.retrieveTravelersTrips(traveler.id));
    })
    console.log(this.allDestinations);
  }

  retrieveTraveler(id) {
    this.currentTraveler = this.allTravelers
      .find(traveler => traveler.id === id);
  }

  retrieveDestinationId(destinationName) {
    return this.allDestinations.reduce((id, destination) => {
      if (destination.destination === destinationName) {
        console.log(destination.id);
        id = destination.id;
        return id;
      }
      return id;
    }, 0)
    // return foundDestinationId
  }

  estimateTripCost(tripDetails) {
    if (tripDetails.every(value => value.length !== 0)) {
      const requestedDestination = this.allDestinations
        .find(destination => destination.destination === tripDetails[0])
      const flights = tripDetails[3] * 
        requestedDestination.estimatedFlightCostPerPerson;
      const lodging = tripDetails[2] * 
        requestedDestination.estimatedLodgingCostPerDay;
      const total = flights + lodging;
      const travelAgent = total * 0.1
      return total + travelAgent;
    }
  }
  
  addTrip(tripDetails) {
    console.log(tripDetails[0]);
    const formattedTrip = {
      id: Date.now(),
      userID: this.currentTraveler.id,
      destinationID: this.retrieveDestinationId(tripDetails[0]),
      travelers: tripDetails[3],
      date: tripDetails[1],
      duration: tripDetails[2],
      status: 'pending',
      suggestedActivities: []
    }
    console.log(formattedTrip);
  }
  //addTrip method?
}
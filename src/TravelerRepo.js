import Traveler from './Traveler';

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
      Object.keys(destination).forEach(property => {
        if (property !== 'id') {
          trip[property] = destination[property];
        }
      })
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
  }

  retrieveTraveler(id) {
    this.currentTraveler = this.allTravelers
      .find(traveler => traveler.id === id);
  }
  //addTrip method?
}
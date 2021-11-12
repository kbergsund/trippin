import Traveler from './Traveler';

export default class TravelerRepo {
  constructor(travelerData, tripData, destinationData) {
    this.allTravelers = travelerData;
    this.allTrips = tripData.flat();
    this.allDestinations = destinationData.flat();
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

  //addTrip method?
}
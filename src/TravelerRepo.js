import Traveler from './Traveler';
import Trips from './Trips';

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
    this.allTravelers.map(traveler => {
      const travelersTrips = new Trips(this.retrieveTravelersTrips(traveler.id));
      return new Traveler(traveler, travelersTrips);
    })
  }
}
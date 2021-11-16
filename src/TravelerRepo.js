import Traveler from './Traveler';

export default class TravelerRepo {
  constructor(travelerData, tripData, destinationData) {
    this.allTrips = tripData;
    this.allDestinations = this.sortDestinations(destinationData);
    this.currentTraveler = travelerData;
  }

  sortDestinations(destinationData) {
    return destinationData.sort((a, b) => {
      if (a.destination < b.destination) {
        return -1;
      } else if (a.destination > b.destination) {
        return 1;
      }
    });
  }

  updateTrips() {
    this.allTrips.map(trip => {
      const destination = this.allDestinations
        .find(destination => destination.id === trip.destinationID)
      Object.keys(destination).forEach(property => {
        if (property !== 'id') {
          trip[property] = destination[property];
        }
      });
    });
  }

  retrieveTravelersTrips(userID) {
    return this.allTrips.filter(trip => trip.userID === userID);
  }

  buildTravelers() {
    this.updateTrips();
    this.currentTraveler =
      new Traveler(this.currentTraveler, 
        this.retrieveTravelersTrips(this.currentTraveler.id));
    return this.currentTraveler;
  }

  retrieveDestinationId(destinationName) {
    return this.allDestinations.reduce((id, destination) => {
      if (destination.destination === destinationName) {
        id = destination.id;
        return id;
      }
      return id;
    }, 0)
  }

  estimateTripCost(tripDetails) {
    const priceFormatter = new Intl.NumberFormat();
    if (tripDetails.every(value => value.length !== 0)) {
      const requestedDestination = this.allDestinations
        .find(destination => destination.destination === tripDetails[0]);
      const flights = tripDetails[3] *
        requestedDestination.estimatedFlightCostPerPerson;
      const lodging = tripDetails[2] *
        requestedDestination.estimatedLodgingCostPerDay;
      const total = flights + lodging;
      const travelAgent = total * 0.1
      return priceFormatter.format(total + travelAgent);
    }
  }

  prepareTripDetails(tripDetails) {
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
    return formattedTrip;
  }
}
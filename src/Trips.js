const dayjs = require('dayjs');

export default class Trips {
  constructor(tripData) {
    this.trips = tripData;
  }

  calculateTripCost(id) {
    const trip = this.trips.find(trip => trip.id === id);
    const flights = trip.travelers * trip.estimatedFlightCostPerPerson;
    const lodging = trip.duration * trip.estimatedLodgingCostPerDay;
    const total = flights + lodging;
    const travelAgent = total * 0.1
    return total + travelAgent;
  }

  calculateTotalCost() {
    this.totalCost = this.trips.reduce((sum, trip) => {
      sum += this.calculateTripCost(trip.id);
      return sum;
    }, 0)
  }

  categorizeTrips() {
    const sortedTrip = this.trips.sort((a, b) => {
      const num1 = parseInt(a.date.replaceAll('/', ''));
      const num2 = parseInt(b.date.replaceAll('/', ''));
      // pending instructor response, solve for the 3 dates with yyyy/m/dd...
      return num1 - num2;
    })
    this.trips = sortedTrip.reduce((obj, trip) => {
      if (trip.status !== 'approved') {
        obj.pending.push(trip);
      } else if (dayjs().isAfter(trip.date)) {
        obj.past.push(trip);
      } else if (dayjs().isSame(trip.date)) {
        obj.past.push(trip);
      } else if (dayjs().isBefore(trip.date)) {
        obj.upcoming.push(trip);
      }
      return obj;
    }, {
      pending: [],
      past: [],
      present: [],
      upcoming: []
    })
  }
}
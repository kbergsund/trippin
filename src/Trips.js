export default class Trips {
  constructor(tripData) {
    this.trips = tripData;
  }

  calculateTripCost(id) {
    const trip = this.trips.find(trip => trip.id === id);
    const flights = trip.travelers * trip.estimatedFlightCostPerPerson;
    const lodging = trip.duration * trip.estimatedLodgingCostPerDay;
    const total = flights + lodging;
    return total + (total * 0.1);
  }

  calculateTotalCost() {
    this.totalCost = this.trips.reduce((sum, trip) => {
      sum += this.calculateTripCost(trip.id);
      return sum;
    }, 0)
  }
}
const dayjs = require('dayjs');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

export default class Trips {
  constructor(tripData) {
    this.trips = tripData;
    this.totalCost = this.calculateTotalCostThisYear();
    this.categorizedTrips = this.categorizeTrips(tripData);
  }

  formatDates(tripData) {
    tripData.forEach(trip => {
      trip.date = dayjs(trip.date).format('YYYY/MM/DD');
    });
  }

  calculateTripCost(id) {
    const trip = this.trips.find(trip => trip.id === id);
    const flights = trip.travelers * trip.estimatedFlightCostPerPerson;
    const lodging = trip.duration * trip.estimatedLodgingCostPerDay;
    const total = flights + lodging;
    const travelAgent = total * 0.1;
    return total + travelAgent;
  }

  calculateTotalCostThisYear() {
    const priceFormatter = new Intl.NumberFormat();
    const total = this.trips.reduce((sum, trip) => {
      if (trip.status === 'approved' &&
        dayjs('2021/01/01').isSameOrBefore(trip.date)) {
        sum += this.calculateTripCost(trip.id);
      }
      return sum;
    }, 0);
    return priceFormatter.format(total);
  }

  categorizeTrips(tripData) {
    this.formatDates(tripData);
    const sortedTrip = tripData.sort((a, b) => {
      const num1 = parseInt(a.date.replaceAll('/', ''));
      const num2 = parseInt(b.date.replaceAll('/', ''));
      return num1 - num2;
    });
    return sortedTrip.reduce((obj, trip) => {
      if (trip.status !== 'approved') {
        obj.pending.push(trip);
      } else if (dayjs().isAfter(trip.date, 'day')) {
        obj.past.push(trip);
      } else if (dayjs().isSame(trip.date, 'day')) {
        obj.present.push(trip);
      } else if (dayjs().isBefore(trip.date, 'day')) {
        obj.upcoming.push(trip);
      }
      return obj;
    }, {
      pending: [],
      past: [],
      present: [],
      upcoming: []
    });
  }
}
import Trips from './Trips';

export default class Traveler {
  constructor(traveler, trips) {
    this.id = traveler.id, 
    this.name = traveler.name,
    this.travelerType = traveler.travelerType;
    this.myTrips = new Trips(trips);
  }
}
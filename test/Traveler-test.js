import chai from 'chai';
const assert = chai.assert;
import { travelerData, tripData } from '../src/data/sampleData.js';
import Traveler from '../src/Traveler';
import Trips from '../src/Trips';

describe('Traveler', function() {
  let traveler;

  beforeEach(function() {
    traveler = new Traveler(travelerData[0], tripData);
  })

  it('should be a function', function() {
    assert.isFunction(Traveler);
  })

  it('should be an instance of Traveler', function() {
    assert.instanceOf(traveler, Traveler);
  })

  it('should be instantiated with an id, name, and travelerType', function() {
    assert.equal(traveler.id, 1);
    assert.equal(traveler.name, 'Ham Leadbeater');
    assert.equal(traveler.travelerType, 'relaxer');
  })

  it('should instantiate Trips with trip data', function() {
    assert.instanceOf(traveler.myTrips, Trips);
    assert.equal(traveler.myTrips.trips, tripData);
  })
})
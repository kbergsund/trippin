import chai from 'chai';
const assert = chai.assert;
import { travelerData, travelerSpecificTrips } from '../src/data/sampleData.js';
import Traveler from '../src/Traveler';
import Trips from '../src/Trips';

describe('Traveler', function() {
  let traveler;

  beforeEach(function() {
    traveler = new Traveler(travelerData[2], travelerSpecificTrips);
  })

  it('should be a function', function() {
    assert.isFunction(Traveler);
  })

  it('should be an instance of Traveler', function() {
    assert.instanceOf(traveler, Traveler);
  })

  it('should be instantiated with an id, name, and travelerType', function() {
    assert.equal(traveler.id, 3);
    assert.equal(traveler.name, 'Sibby Dawidowitsch');
    assert.equal(traveler.travelerType, 'shopper');
  })

  it('should instantiate Trips with trip data', function() {
    assert.instanceOf(traveler.myTrips, Trips);
    assert.equal(traveler.myTrips.trips, travelerSpecificTrips);
  })
})
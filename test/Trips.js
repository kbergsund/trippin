import chai from 'chai';
const assert = chai.assert;
import { tripData } from '../src/data/sampleData.js';
import Trips from '../src/Trips';

describe('Trips', function() {
  let trips, allTrips;

  beforeEach(function() {
    allTrips = tripData;
    trips = new Trips(tripData);
  })

  it('should be a function', function() {
    assert.isFunction(Trips);
  });

  it('should be an instance of Trips', function() {
    assert.instanceOf(trips, Trips);
  })

  it('should be instantiated with trip data', function() {
    assert.equal(trips.trips, allTrips);
  })

  //it should find total cost of all trips

  //it should sort by date...
})
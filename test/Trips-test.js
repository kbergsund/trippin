import chai from 'chai';
const assert = chai.assert;
import { travelerSpecificTrips, categorizedTravelersTrips } from '../src/data/sampleData.js';
import Trips from '../src/Trips';

describe('Trips', function() {
  let user3Trips;

  beforeEach(function() {
    user3Trips = new Trips(travelerSpecificTrips);
  });

  it('should be a function', function() {
    assert.isFunction(Trips);
  });

  it('should be an instance of Trips', function() {
    assert.instanceOf(user3Trips, Trips);
  });

  it('should be instantiated with trip data', function() {
    assert.equal(user3Trips.trips, travelerSpecificTrips);
  });

  it('should calculate the cost of a single trip given a trip id', function() {
    assert.equal(user3Trips.calculateTripCost(3), 4543)
  })

  it('should find the total cost of all user3Trips', function() {
    user3Trips.calculateTotalCost()
    assert.equal(user3Trips.totalCost, 13409);
  });

  it('should sort by date & into categories: pending, past, present, upcoming', function() {
    user3Trips.categorizeTrips();
    assert.deepEqual(user3Trips.trips, categorizedTravelersTrips);
  });
})
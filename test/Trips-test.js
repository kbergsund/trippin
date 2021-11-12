import chai from 'chai';
const assert = chai.assert;
import { tripDestinationData, travelerSpecificTrips, categorizedTravelersTrips } from '../src/data/sampleData.js';
import Trips from '../src/Trips';

describe('Trips', function() {
  let trips, user3Trips;

  beforeEach(function() {
    trips = new Trips(tripDestinationData);
    user3Trips = new Trips(travelerSpecificTrips);
  });

  it('should be a function', function() {
    assert.isFunction(Trips);
  });

  it('should be an instance of Trips', function() {
    assert.instanceOf(trips, Trips);
  });

  it('should be instantiated with trip data', function() {
    assert.equal(user3Trips.trips, travelerSpecificTrips);
  });

  it('should standardize date formatting', function() {
    trips.formatDates();
    assert.equal(trips.trips[2].date, '2020/03/28');
  })

  it('should calculate the cost of a single trip given a trip id', function() {
    assert.equal(user3Trips.calculateTripCost(3), 4543)
  })

  it('should find the total cost of all trips so far this year', function() {
    // trips.calculateTotalCostThisYear()
    assert.equal(trips.totalCost, 8668);
  });

  it('should sort by date & into categories: pending, past, present, upcoming', function() {
    user3Trips.categorizeTrips();
    assert.deepEqual(user3Trips.trips, categorizedTravelersTrips);
  });
})
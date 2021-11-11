import chai from 'chai';
const assert = chai.assert;
import { travelerSpecificTrips } from '../src/data/sampleData.js';
import Trips from '../src/Trips';

describe('Trips', function() {
  let trips;

  beforeEach(function() {
    trips = new Trips(travelerSpecificTrips);
  });

  it('should be a function', function() {
    assert.isFunction(Trips);
  });

  it('should be an instance of Trips', function() {
    assert.instanceOf(trips, Trips);
  });

  it('should be instantiated with trip data', function() {
    assert.equal(trips.trips, travelerSpecificTrips);
  });

  it('should calculate the cost of a single trip given a trip id', function() {
    assert.equal(trips.calculateTripCost(3), 4543)
  })

  it('should find the total cost of all trips', function() {
    trips.calculateTotalCost()
    assert.equal(trips.totalCost, 13409);
  });

  // it('should sort by date into categories: past, present, upcoming, pending', function() {
  //   assert.equal(trips.categorizeByDate(), ['?']);
  // });
})
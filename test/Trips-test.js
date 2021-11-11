import chai from 'chai';
const assert = chai.assert;
import { tripData } from '../src/data/sampleData.js';
import Trips from '../src/Trips';

describe('Trips', function() {
  let trips, allTrips;

  beforeEach(function() {
    allTrips = tripData;
    trips = new Trips(tripData);
  });

  it('should be a function', function() {
    assert.isFunction(Trips);
  });

  it('should be an instance of Trips', function() {
    assert.instanceOf(trips, Trips);
  });

  it('should be instantiated with trip data', function() {
    assert.equal(trips.trips, allTrips);
  });

  // it('should find the total cost of all trips', function() {
  //   assert.equal(trips.calculateTotalCost(), 100)
  // });

  // it('should sort by date into categories: past, present, upcoming, pending', function() {
  //   assert.equal(trips.categorizeByDate(), ['?']);
  // });
})
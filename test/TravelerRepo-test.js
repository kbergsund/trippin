import chai from 'chai';
const assert = chai.assert;
import { travelerData, tripData, destinationData, sortedDestinationData, tripDestinationData, travelerSpecificTrips, sampleTripDetails } from '../src/data/sampleData.js';
import TravelerRepo from '../src/TravelerRepo';
import Traveler from '../src/Traveler';

describe('TravelerRepo', function() {
  let travelerRepo;

  beforeEach(function() {
    travelerRepo = new TravelerRepo(travelerData[2], tripData, destinationData);
  });

  it('should be a function', function() {
    assert.isFunction(TravelerRepo);
  });

  it('should be an instance of TravelerRepo', function() {
    assert.instanceOf(travelerRepo, TravelerRepo)
  });

  it('should be instantiated with traveler data, trip data, and sorted destination data', function() {
    assert.equal(travelerRepo.currentTraveler, travelerData[2]);
    assert.equal(travelerRepo.allTrips, tripData);
    assert.deepEqual(travelerRepo.allDestinations, sortedDestinationData)
  });

  it('should sort destinations by destination name', function() {
    assert.deepEqual(travelerRepo.sortDestinations(destinationData),
      sortedDestinationData);
  });

  it('should add destination info to all trips', function() {
    travelerRepo.updateTrips();
    assert.deepEqual(travelerRepo.allTrips, tripDestinationData);
  });

  it('should retrieve all trips for specific user given a traveler ID', function() {
    assert.deepEqual(travelerRepo.retrieveTravelersTrips(3)[0], 
      travelerSpecificTrips[2]);
  });

  it('should instantiate a Traveler with their specific trips in a Trips object instance', function() {
    travelerRepo.buildTravelers();
    assert.instanceOf(travelerRepo.currentTraveler, Traveler)
    assert.deepEqual(travelerRepo.currentTraveler.myTrips.trips,
      travelerSpecificTrips);
  });

  it('should retrieve a destination ID given a specific destination name', function() {
    assert.equal(travelerRepo.retrieveDestinationId('Toronto, Canada'), 10)
  });

  it('should estimate a trip\'s cost based on details passed in', function() {
    assert.equal(travelerRepo.estimateTripCost(sampleTripDetails), '1,386')
  });
})
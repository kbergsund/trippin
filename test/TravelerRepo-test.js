import chai from 'chai';
const assert = chai.assert;
import { travelerData, tripData, destinationData, tripDestinationData, travelerSpecificTrips} from '../src/data/sampleData.js';
import TravelerRepo from '../src/TravelerRepo';
import Traveler from '../src/Traveler';

describe('TravelerRepo', function() {
  let travelerRepo;

  beforeEach(function() {
    travelerRepo = new TravelerRepo(travelerData, tripData, destinationData);
  })

  it('should be a function', function() {
    assert.isFunction(TravelerRepo);
  })

  it('should be an instance of TravelerRepo', function() {
    assert.instanceOf(travelerRepo, TravelerRepo)
  })

  it('should be instantiated with traveler data, trip data, and destination data', function() {
    assert.equal(travelerRepo.allTravelers, travelerData);
    assert.equal(travelerRepo.allTrips, tripData);
    assert.equal(travelerRepo.allDestinations, destinationData)
  })

  it('should add destination info to all trips', function() {
    travelerRepo.updateTrips();

    assert.deepEqual(travelerRepo.allTrips, tripDestinationData);
  })

  it('should retrieve all trips for specific user given a user ID', function() {
    assert.deepEqual(travelerRepo.retrieveTravelersTrips(3), travelerSpecificTrips);
  })

  it('should instantiate all 50 Travelers, each of which should have their specific trips in a Trips object instance', function() {
    travelerRepo.buildTravelers();

    assert.instanceOf(travelerRepo.allTravelers[0], Traveler)
    assert.deepEqual(travelerRepo.allTravelers[2].myTrips.trips, travelerSpecificTrips);
  })

})
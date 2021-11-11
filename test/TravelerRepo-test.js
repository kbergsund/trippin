import chai from 'chai';
const assert = chai.assert;
import { travelerData, tripData, destinationData, tripDestinationData, userSpecificData} from '../src/data/sampleData.js';
import TravelerRepo from '../src/TravelerRepo';

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
    assert.deepEqual(travelerRepo.retrieveTravelersTrips(3), userSpecificData);
  })

  it('should instantiate all 50 Travelers, each of which should have their trips in a Trips object instance', function() {
    travelerRepo.buildTravelers();
    // check if this.allTravelers[0] is instance of Traveler?
    // check if it has a trips property that is an instance of Trips?
    console.log(travelerRepo.allTravelers);
  })

})
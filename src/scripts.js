import './css/base.scss';
import './images/mountains-tanyadzu.png';
import './images/user.svg';
import { fetchData } from './fetch';
import TravelerRepo from './TravelerRepo'

const retrieveData = () => {
  Promise.all(
    [fetchData('travelers'), fetchData('trips'), fetchData('destinations')]
  ).then(data => {
    buildTravelerRepo(
      Object.values(data[0])[0], 
      Object.values(data[1]), 
      Object.values(data[2]));
  })
}

const buildTravelerRepo = (travelerData, tripData, destinationData) => {
  const travelerRepo = 
    new TravelerRepo(travelerData, tripData, destinationData);
  travelerRepo.buildTravelers();
  console.log(travelerRepo);
}

retrieveData();
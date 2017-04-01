import angular from 'angular';

import ItineraryService from './itinerary.service';
import UserService from './user.service';

export default angular.module('services', [])
  .service('ItineraryService', ItineraryService)
  .service('UserService', UserService)
  .name;

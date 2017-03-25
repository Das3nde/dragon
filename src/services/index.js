import angular from 'angular';

import UserService from './user.service';

export default angular.module('services', [])
  .service('UserService', UserService)
  .name;

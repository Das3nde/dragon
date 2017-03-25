import angular from 'angular';

import Activities from './activities.component';

export default angular.module('component.activities', [])
  .component('activities', Activities)
  .name;

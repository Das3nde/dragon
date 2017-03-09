import angular from 'angular';
import ngRoute from 'angular-route';
import uiRouter from 'angular-ui-router';

import templates from './templates';
import components from './components';

angular.module('DragonApp', [
  ngRoute,
  templates,
  components,
  uiRouter,
]);

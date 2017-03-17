import angular from 'angular';
import ngRoute from 'angular-route';
import uiRouter from 'angular-ui-router';

import components from './components';
import routes from './routes';
import templates from './templates';

angular.module('DragonApp', [
  ngRoute,
  uiRouter,
  components,
  routes,
  templates,
]);

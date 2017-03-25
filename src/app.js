import 'babel-polyfill';

import angular from 'angular';
import ngRoute from 'angular-route';
import uiRouter from 'angular-ui-router';

import components from './components';
import routes from './routes';
import services from './services';
import templates from './templates';

angular.module('DragonApp', [
  ngRoute,
  uiRouter,
  components,
  routes,
  services,
  templates,
]);

import angular from 'angular';
import ngRoute from 'angular-route';
import templates from './templates';
import components from './components';

angular.module('DragonApp', [
  ngRoute,
  templates,
  components,
]);

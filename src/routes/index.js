import angular from 'angular';

export default angular.module('routes', [])
  .config(($locationProvider, $urlRouterProvider) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name;

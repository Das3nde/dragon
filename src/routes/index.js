import angular from 'angular';

export default angular.module('routes', [])
  .config(($locationProvider, $urlRouterProvider, $stateProvider) => {
    $stateProvider
      .state('splash', {
        url: '/',
        component: 'splash',
      })
      .state('login', {
        url: '/login',
        component: 'login',
      })
      .state('main', {
        url: '/main',
        component: 'main',
      });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name;

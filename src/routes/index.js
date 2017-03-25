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
      .state('korea', {
        abstract: true,
        url: '/korea',
        template: '<ui-view></ui-view>',
      })
      .state('korea.main', {
        url: '/main',
        component: 'main',
      })
      .state('korea.account', {
        url: '/account',
        component: 'account',
        resolve: {
          user: UserService => UserService.get(),
        },
      })
      .state('korea.faq', {
        url: '/faq',
        template: '<h2>Korea FAQ</h2>',
      });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name;

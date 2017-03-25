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
])
.run(($transitions, $q) => {
  $transitions.onStart({ to: 'korea.**' }, (trans) => {
    const $state = trans.router.stateService;
    const UserService = trans.injector().get('UserService');

    return $q.when(UserService.getFail())
      .catch(() => $state.target('login'));
  });
});

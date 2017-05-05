import 'babel-polyfill';

import angular from 'angular';
import ngRoute from 'angular-route';
import uiModal from 'angular-ui-bootstrap/src/modal/index-nocss';
import uiRouter from '@uirouter/angularjs';

import components from './components';
import routes from './routes';
import services from './services';
import templates from './templates';

angular.module('DragonApp', [
  ngRoute,
  uiModal,
  uiRouter,
  components,
  routes,
  services,
  templates,
])
.run(($transitions, $q, $uibModal) => {
  $transitions.onBefore({ to: 'login' }, (trans) => {
    const $state = trans.router.stateService;
    const UserService = trans.injector().get('UserService');

    if (UserService.loggedIn) {
      $state.target('korea.gathering');
    }
  });

  $transitions.onStart({ to: 'korea.**' }, (trans) => {
    const $state = trans.router.stateService;
    const UserService = trans.injector().get('UserService');

    return $q.when(UserService.get())
      .then((user) => {
        if (!user.hasPassword) {
          $uibModal.open({
            component: 'setPassword',
            backdrop: 'static',
          });
        }
      })
      .catch(() => $state.target('login'));
  });
});

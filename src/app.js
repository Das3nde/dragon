import 'babel-polyfill';

import angular from 'angular';
import ngRoute from 'angular-route';
import uiModal from 'angular-ui-bootstrap/src/modal/index-nocss';
import uiRouter from 'angular-ui-router';

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
  $transitions.onStart({ to: 'korea.**' }, (trans) => {
    const $state = trans.router.stateService;
    const UserService = trans.injector().get('UserService');

    return $q.when(UserService.get())
      .then((user) => {
        if (!user.code) {
          $uibModal.open({
            template: '<h2>Test Modal!</h2>',
            backdrop: 'static',
          });
        }
      })
      .catch(() => $state.target('login'));
  });
});

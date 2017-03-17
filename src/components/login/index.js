import angular from 'angular';
import Login from './login.component';

export default angular.module('component.login', [])
  .component('login', Login)
  .name;

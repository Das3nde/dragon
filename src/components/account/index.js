import angular from 'angular';
import Account from './account.component';

export default angular.module('component.account', [])
  .component('account', Account)
  .name;

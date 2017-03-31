import angular from 'angular';

import Navbar from './navbar.component';

export default angular.module('component.navbar', [])
  .component('navbar', Navbar)
  .name;

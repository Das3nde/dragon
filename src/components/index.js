import angular from 'angular';

import CountdownTimer from './countdown-timer';
import Login from './login';
import Main from './main';
import Splash from './splash';

export default angular.module('components', [
  CountdownTimer,
  Login,
  Main,
  Splash,
])
.name;

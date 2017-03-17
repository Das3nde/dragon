import angular from 'angular';

import CountdownTimer from './countdown-timer';
import Login from './login';
import Splash from './splash';

export default angular.module('components', [
  CountdownTimer,
  Login,
  Splash,
])
.name;

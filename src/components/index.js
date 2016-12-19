import angular from 'angular';
import Splash from './splash';
import CountdownTimer from './countdown-timer';

export default angular.module('components', [
  Splash,
  CountdownTimer,
])
.name;

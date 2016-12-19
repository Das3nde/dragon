import angular from 'angular'
import CountdownTimer from './countdown-timer.component';

export default angular.module('component.countdown-timer', [])
  .component('countdownTimer', CountdownTimer)
  .name;

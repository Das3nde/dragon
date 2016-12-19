import CountdownTimerCtrl from './countdown-timer.controller';

export default {
  templateUrl: 'views/countdown-timer.html',
  bindings: {
    date: '@',
  },
  controller: CountdownTimerCtrl,
};

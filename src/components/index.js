import angular from 'angular';

import Account from './account';
import Activities from './activities';
import CountdownTimer from './countdown-timer';
import Login from './login';
import Main from './main';
import Modals from './modals';
import Splash from './splash';

export default angular.module('components', [
  Account,
  Activities,
  CountdownTimer,
  Login,
  Main,
  Modals,
  Splash,
])
.name;

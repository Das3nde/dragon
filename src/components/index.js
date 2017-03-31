import angular from 'angular';

import Account from './account';
import Activities from './activities';
import CountdownTimer from './countdown-timer';
import Login from './login';
import Gathering from './gathering';
import Modals from './modals';
import Navbar from './navbar';
import Splash from './splash';

export default angular.module('components', [
  Account,
  Activities,
  CountdownTimer,
  Login,
  Gathering,
  Modals,
  Navbar,
  Splash,
])
.name;

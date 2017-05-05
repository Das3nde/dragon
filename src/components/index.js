import angular from 'angular';

import Account from './account';
import Activities from './activities';
import CountdownTimer from './countdown-timer';
import FAQ from './faq';
import Gathering from './gathering';
import Login from './login';
import Modals from './modals';
import Navbar from './navbar';
import Splash from './splash';

export default angular.module('components', [
  Account,
  Activities,
  CountdownTimer,
  FAQ,
  Gathering,
  Login,
  Modals,
  Navbar,
  Splash,
])
.name;

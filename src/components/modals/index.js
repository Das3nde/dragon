import angular from 'angular';

import CompleteReservation from './complete-reservation';
import SetPassword from './set-password';

export default angular.module('component.modals', [
  CompleteReservation,
  SetPassword,
])
.name;

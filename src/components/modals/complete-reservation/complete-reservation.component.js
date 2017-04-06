import controller from './complete-reservation.controller';

export default {
  controller,
  templateUrl: 'views/complete-reservation.html',
  bindings: {
    resolve: '<',
    modalInstance: '<',
  },
};

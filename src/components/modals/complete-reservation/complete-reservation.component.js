import controller from './complete-reservation.controller';

export default {
  controller,
  template: '<h1>{{$ctrl.unpaidInvoices}}</h1>',
  bindings: {
    resolve: '<',
  },
};

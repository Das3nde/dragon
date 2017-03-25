import controller from './account.controller';

export default {
  templateUrl: 'views/account.html',
  controller,
  bindings: {
    user: '<',
  },
};

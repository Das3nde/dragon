import angular from 'angular';

describe('AccountController', () => {
  beforeEach(angular.mock.module('component.account'));

  let $ctrl;

  beforeEach(angular.mock.inject(($componentController) => {
    $ctrl = $componentController('account');
  }));

  it('exists', () => {
    expect($ctrl).toBeDefined();
  });
});

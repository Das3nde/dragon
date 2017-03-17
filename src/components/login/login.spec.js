import angular from 'angular';

describe('LoginController', () => {
  beforeEach(angular.mock.module('DragonApp'));

  let $compile;
  let $rootScope;
  let $componentController;

  beforeEach(angular.mock.inject((_$compile_, _$rootScope_, _$componentController_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
  }));

  it('tells the user to login', () => {
    const element = $compile('<login></login>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('Please Login');
  });

  it('puts the lotion on its skin', () => {
    const ctrl = $componentController('login');
    expect(ctrl.testVariable).toBe('test');
  });
});

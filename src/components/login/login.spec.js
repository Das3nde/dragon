import angular from 'angular';

describe('LoginController', () => {
  beforeEach(angular.mock.module('DragonApp'));

  let $compile;
  let $rootScope;

  beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('tells the user to login', () => {
    const element = $compile('<login></login>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('Please Login');
  });
});

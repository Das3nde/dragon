/*
import angular from 'angular';

describe('MainComponent', () => {
  beforeEach(angular.mock.module('DragonApp'));

  let $compile;
  let $rootScope;
  let $componentController;

  beforeEach(angular.mock.inject((_$compile_, _$rootScope_, _$componentController_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
  }));

  it('says Test', () => {
    const element = $compile('<main></main>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('Test');
  });

  it('has $ctrl.test = Test', () => {
    const $ctrl = $componentController('main');
    expect($ctrl.test).toBe('Test');
  });
});
*/

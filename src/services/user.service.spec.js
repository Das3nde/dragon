import angular from 'angular';

describe('User Service', () => {
  beforeEach(angular.mock.module('services'));

  let UserService;

  beforeEach(angular.mock.inject((_UserService_) => {
    UserService = _UserService_;
  }));

  it('exists', () => {
    expect(UserService).toBeDefined();
  });

  it('has a get method that returns something', () => {
    expect(UserService.get).toBeDefined();
  });
});

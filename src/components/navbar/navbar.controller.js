export default class {
  constructor($http, $state) {
    Object.assign(this, { $http, $state });
  }

  logout() {
    this.$http.get('/user/logout')
      .then(() => {
        this.$state.go('login');
      });
  }
}

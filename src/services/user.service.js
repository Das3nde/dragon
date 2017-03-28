export default class {
  constructor($http) {
    Object.assign(this, { $http });
  }

  get() {
    return this.user || this.$http.get('/user')
      .then((user) => {
        this.user = user;
        return this.user;
      });
  }

  get loggedIn() {
    return !!this.user;
  }

  getFail() {
    return this.$http.get('/fail');
  }
}

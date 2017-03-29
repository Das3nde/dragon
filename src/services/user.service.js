export default class {
  constructor($http) {
    Object.assign(this, { $http });
  }

  get() {
    return this.user || this.$http.get('/user')
      .then((res) => {
        this.user = res.data;
        return this.user;
      });
  }

  get loggedIn() {
    return !!this.user;
  }

  setPassword(password) {
    return this.$http.post('/set-password', { password })
      .then((user) => {
        this.user = user;
        return this.user;
      });
  }
}

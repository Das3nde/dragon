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

  reserve(reservation) {
    this.user.reservation = reservation;
    return this.$http.post('/user/reserve', { reservation })
      .then((res) => {
        this.user = res.data;
        return this.user;
      });
  }

  login(email, password) {
    return this.$http.post('/user/login', { email, password })
      .then((res) => {
        this.user = res.data;
        return this.user;
      });
  }

  get loggedIn() {
    return !!this.user;
  }

  setPassword(password) {
    return this.$http.post('/user/set-password', { password })
      .then((res) => {
        this.user = res.data;
        return this.user;
      });
  }
}

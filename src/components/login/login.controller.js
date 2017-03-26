export default class LoginCtrl {
  constructor($http) {
    Object.assign(this, { $http });
  }

  login() {
    const email = this.credentials.email;
    const password = this.credentials.password;

    this.$http.post('/login', { email, password })
      .then((response) => {
        window.alert(response);
      })
      .catch((err) => {
        window.alert(err);
      });
  }
}

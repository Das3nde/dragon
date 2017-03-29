export default class LoginCtrl {
  constructor($http, $state, $timeout) {
    Object.assign(this, { $http, $state, $timeout });
  }

  flashError(message) {
    this.errorMessage = message;
    this.showError = true;
    this.$timeout(() => {
      this.errorMessage = '';
      this.showError = false;
    }, 5000);
  }

  login() {
    const email = this.credentials.email;
    const password = this.credentials.password;

    this.$http.post('/login', { email, password })
      .then(() => {
        this.$state.go('korea.main');
      })
      .catch((err) => {
        if (err.status === 401) {
          this.flashError('Invalid Username or Password');
        } else {
          this.flashError('An unknown error occurred, please try again later');
        }
      });
  }
}

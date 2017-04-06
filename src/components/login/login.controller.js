export default class LoginCtrl {
  constructor(UserService, $state, $timeout) {
    Object.assign(this, { UserService, $state, $timeout });
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

    this.UserService.login(email, password)
      .then(() => {
        this.$state.go('korea.gathering');
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

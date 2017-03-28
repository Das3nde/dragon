export default class {
  constructor($http) {
    Object.assign(this, { $http });
  }

  /*
   * New password must be $valid and the user
   * must have typed something already ($dirty)
   */

  pwNewError() {
    return (this.setPwForm.pwNew.$invalid && this.setPwForm.pwNew.$dirty);
  }

  /*
   * Confirmation password must match!
   */

  pwConfirmError() {
    return (this.pwNew !== this.pwConfirm);
  }

  /*
   * In order to submit new password:
   *  - New password must have a value
   *  - Value must pass the form validators
   *  - Confirmation of PW must match
   */

  disableSubmit() {
    return this.setPwForm.pwNew.$invalid
      || this.pwConfirmError();
  }

  submit() {
    this.$http.get('/test');
    if (this.pwNewError() || this.pwConfirmError()) {
      console.log('Errors');
    } else {
      console.log('No Errors!');
    }
  }
}

export default class {
  constructor($scope, $http, $timeout) {
    'ngInject';

    Object.assign(this, { $scope, $http, $timeout });

    this.email = '';
    this.code = new Array(5);

    this.codeValid = false;
    this.codeValidMsg = '';

    this.completed = false;
    this.disableEmail = false;
  }

  $postLink() {
    this.$scope.$watch('codeForm.$valid', (formValid) => {
      if (formValid) {
        const _code = this.code.join('').toUpperCase();

        this.$http.post('/code', { _code })
          .then(() => {
            this.codeValid = true;
            this.codeValidMsg = 'Code Validated';
          })
          .catch(() => {
            this.code = new Array(5);
            this.codeValid = false;
            this.codeValidMsg = 'Code Invalid!';

            this.$timeout(() => {
              this.codeValidMsg = '';
            }, 2000);
          });
      }
    });
  }

  register() {
    this.disableEmail = true;
    const _code = this.code.join('').toUpperCase();
    const _email = this.email;

    this.$http.post('/register', { _code, _email })
      .then(() => {
        this.completed = true;
      })
      .catch((error) => {
        this.disableEmail = false;
        this.emailValidMsg = error.data;
        this.$timeout(() => {
          this.emailValidMsg = '';
        }, 2000);
      });
  }
}

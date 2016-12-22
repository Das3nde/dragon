export default class {
  constructor($scope, $http, $timeout) {
    'ngInject';

    Object.assign(this, { $scope, $http, $timeout });

    this.email = '';
    this.code = new Array(5);

    this.codeValid = false;
    this.codeValidMsg = '';
  }

  $postLink() {
    this.$scope.$watch('codeForm.$valid', (formValid) => {
      if (formValid) {
        const _code = this.code.join('').toUpperCase();

        this.$http.post('/code', { _code })
          .then((res) => {
            this.codeValid = true;
            this.codeValidMsg = 'Code Valididated';
          })
          .catch((error) => {
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
    const _code = this.code.join('').toUpperCase();
    const _email = this.email;

    this.$http.post('/register', { _code, _email })
      .then((res) => {
      })
      .catch((error) => {
      });
  }
}

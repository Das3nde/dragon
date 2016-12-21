export default class {
  constructor($scope, $http) {
    'ngInject';

    Object.assign(this, { $scope, $http });

    this.code = new Array(5);
  }

  $postLink() {
    this.$scope.$watch('codeForm.$valid', (_$valid) => {
      if (_$valid) {
        this.disableInput = true;
        const _code = this.code.join('').toUpperCase();

        this.$http.post('/register', { _code })
          .then((res) => {
            this.result = res.data;
          })
          .catch((error) => {
            this.result = error;
          });
      }
    });
  }
}

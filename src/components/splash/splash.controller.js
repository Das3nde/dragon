export default class {
  constructor($scope) {
    this.$scope = $scope;
    this.code = new Array(5);
  }

  $postLink() {
    this.$scope.$watch('codeForm.$valid', () => {
      if (this.$scope.codeForm.$valid) console.log(this.code.join(''));
    });
  }
}

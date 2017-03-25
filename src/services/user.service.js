export default class {
  constructor($http) {
    Object.assign(this, { $http });
  }

  get() {
    return this.$http;
  }
}

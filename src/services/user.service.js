export default class {
  constructor($http) {
    Object.assign(this, { $http });

    this.user = {
      firstName: 'Justin',
      lastName: 'Knutson',
      fullName: 'Justin Knutson',
      email: 'knutson.justin@gmail.com',
      phone: '2537203662',
      birthday: '06/23/1989',
      inviteYear: '1989',
    };
  }

  /* eslint-disable class-methods-use-this */
  get() {
    return this.user || this.$http.get('/test');
  }

  getFail() {
    return this.$http.get('/fail');
  }
}

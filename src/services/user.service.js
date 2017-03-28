export default class {
  constructor($http) {
    Object.assign(this, { $http });

    /*
    this.user = {
      firstName: 'Justin',
      lastName: 'Knutson',
      fullName: 'Justin Knutson',
      email: 'knutson.justin@gmail.com',
      phone: '2537203662',
      birthday: '06/23/1989',
      inviteYear: '1989',
    };
    */
  }

  get() {
    return this.user || this.$http.get('/user')
      .then((user) => {
        console.log(user);
        this.user = user;
        return this.user;
      });
  }

  get loggedIn() {
    return !!this.user;
  }

  getFail() {
    return this.$http.get('/fail');
  }
}

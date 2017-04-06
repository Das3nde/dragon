export default class {
  constructor(ItineraryService, UserService, $uibModal) {
    Object.assign(this, { ItineraryService, UserService, $uibModal });

    this.itineraryDays = ItineraryService.days;
    this.reservation = Object.assign({ }, UserService.user.reservation);
  }

  reservationStatus(id) {
    return this.reservation[id];
  }

  addToReservation(id) {
    this.reservation[id] = 'pending';
  }

  removeFromReservation(id) {
    delete this.reservation[id];
  }

  saveReservation() {
    this.UserService.user.reservation = this.reservation;
    // this.UserService.save();
  }

  completeReservation() {
    this.$uibModal.open({
      component: 'completeReservation',
      resolve: {
        pending: () => {
          const pendingItems = [];

          Object.entries(this.reservation).forEach((entry) => {
            const [k, stat] = entry;

            console.log(k, stat);
            if (stat === 'pending') pendingItems.push(k);
          });

          return pendingItems;
        },
      },
    });
  }
}

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
    this.reservation[id] = 'unpaid';
  }

  removeFromReservation(id) {
    delete this.reservation[id];
  }

  completeReservation() {
    // Open modal to complete payment
    Object.keys(this.reservation).forEach((id) => {
      if (this.reservation[id] === 'unpaid') {
        this.reservation[id] = 'paid';
      }
    });

    this.$uibModal.open({
      component: 'completeReservation',
    });
  }
}

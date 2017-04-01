export default class {
  constructor(ItineraryService, UserService) {
    Object.assign(this, { ItineraryService, UserService });

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
    console.log(this.reservation);
  }
}

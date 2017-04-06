export default class {
  constructor(ItineraryService, UserService, $uibModal) {
    Object.assign(this, { ItineraryService, UserService, $uibModal });

    this.itineraryDays = ItineraryService.days;
    this.reservation = { };

    const savedReservation = UserService.user.reservation || { };

    this.itineraryDays.forEach((day) => {
      this.reservation[day.id] = { };
    });

    Object.assign(this.reservation, savedReservation);
  }

  reservationStatus(id) {
    return this.reservation[id].status;
  }

  addToReservation(id) {
    this.reservation[id].status = 'pending';
  }

  removeFromReservation(id) {
    this.reservation[id].status = undefined;
  }

  hasPending() {
    return Object.values(this.reservation).map(value => value.status).includes('pending');
  }

  completeReservation() {
    this.$uibModal.open({
      component: 'completeReservation',
      resolve: {
        pending: () => {
          const pendingItems = [];

          Object.entries(this.reservation).forEach((entry) => {
            const [k, value] = entry;
            if (value.status === 'pending') pendingItems.push(k);
          });

          return pendingItems;
        },
      },
    })
    .result
    .then((reservedItems) => {
      this.UserService.reserve(reservedItems)
        .then((user) => {
          Object.assign(this.reservation, user.reservation);
        });
    });
  }
}

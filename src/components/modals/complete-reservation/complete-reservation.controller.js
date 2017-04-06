export default class {
  constructor(ItineraryService) {
    Object.assign(this, { ItineraryService });

    this.lineItems = [];
  }

  $onInit() {
    this.resolve.unpaid.forEach((invoice) => {
      this.lineItems.push(this.ItineraryService.get(invoice));
    });
  }

  get subtotal() {
    let subtotal = 0;
    this.lineItems.forEach((item) => {
      subtotal += item.price * (item.guest ? 2 : 1);
    });
    return subtotal;
  }
}

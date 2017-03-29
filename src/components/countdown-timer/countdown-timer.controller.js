export default class {
  constructor($interval) {
    Object.assign(this, { $interval });
  }

  $onInit() {
    const future = new Date(this.date);

    this.$interval(() => {
      let t = Math.floor((future.getTime() - Date.now()) / 1000);

      const days = Math.floor(t / 86400);
      t -= days * 86400;

      const hours = Math.floor(t / 3600) % 24; // why mod?
      t -= hours * 3600;

      const minutes = Math.floor(t / 60) % 60; // why mod?
      t -= minutes * 60;

      const seconds = t % 60;

      this.timeString = [
        `${days}d`,
        `${hours}h`,
        `${minutes}m`,
        `${seconds}s`,
      ].join(' ');
    }, 1000);
  }
}

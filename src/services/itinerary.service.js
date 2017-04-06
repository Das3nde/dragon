export default class {
  constructor() {
    this.days = [
      {
        id: 'id1',
        dateString: 'June 23',
        title: 'The Gathering',
        location: 'Seoul',
        description: 'Find the hidden location of The Gathering and join us in turning up to 11. Where will the night take us? Who knows?',
        price: '85',
      },
      {
        id: 'id2',
        dateString: 'June 24',
        title: 'Gangnam Style',
        location: 'Seoul',
        description: 'Life south of the river is... different. Time to get schwifty Korean-style.',
        price: '85',
      },
      {
        id: 'id3',
        dateString: 'June 25',
        title: 'Recovery Day',
        location: 'Seoul',
        description: 'Hangover hangover hangover hangover...',
        price: '85',
      },
      {
        id: 'id4',
        dateString: 'June 26 - 28',
        title: 'Run-out Trip',
        location: 'Various Locations',
        description: 'A train through the mountains? American BBQ in the heartland of Korea? The world\'s best spicy chicken and ramen? All this and more on a three-day trip out of the big city.',
        price: '255',
      },
      {
        id: 'id5',
        dateString: 'June 29',
        title: 'Back to the Big City',
        location: 'Seoul',
        description: 'Refreshed and well-fed, it is time to rejoin our compatriots in Seoul',
        price: '85',
      },
      {
        id: 'id6',
        dateString: 'June 30',
        title: 'Everland',
        location: 'Seoul',
        description: 'It\'s literally an amusement park with one of the tallest and fastest wooden rollercoasters in the world',
        price: '85',
      },
      {
        id: 'id7',
        dateString: 'July 1',
        title: 'Last Hurrah',
        location: 'Seoul',
        description: 'Knock knock. Who\'s there? SOJUUUUUUUUUUUUUUUUU',
        price: '85',
      },
    ];
  }

  get(id) {
    return this.days.find(e => e.id === id);
  }
}

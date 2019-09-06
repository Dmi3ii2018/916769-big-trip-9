const EVENTS_NUMBER = 4;
const tripTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];

export const createRoutePoint = () => ({
  tripType: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  activity: [`Check`, `Sightseeng`, `Restaurant`],
  tripTypeImage: `img/icons/${tripTypes[Math.floor(Math.random() * 7)]}.png`,
  cityName: [`Moscow`, `London`, `Paris`, `Oslo`, `Berlin`, `Madrid`, `Riga`, `Rome`],
  cityImages: [
    `https://picsum.photos/300/150?r=${Math.random()}`,
    `https://picsum.photos/300/150?r=${Math.random()}`,
    `https://picsum.photos/300/150?r=${Math.random()}`,
    `https://picsum.photos/300/150?r=${Math.random()}`,
  ],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. `,
    `Fusce tristique felis at fermentum pharetra. `,
    `Aliquam id orci ut lectus varius viverra. `,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
    `Sed sed nisi sed augue convallis suscipit in sed felis. `,
    `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. `,
    `In rutrum ac purus sit amet tempus.`
  ].slice(0, Math.floor(Math.random() * 3 + 1)),

  date: {
    start: Date.now() + 1 + Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000,
    end: Date.now() + Math.floor(Math.random() * 20 + 5) * 24 * 60 * 60 * 1000,
  },

  price: Math.floor(Math.random() * 1000),

  options: [
    {name: `luggage`, price: 10, choosen: Boolean(Math.round(Math.random()))},
    {name: `Switch to comfort class`, price: 150, choosen: Boolean(Math.round(Math.random()))},
    {name: `Add meal`, price: 2, choosen: Boolean(Math.round(Math.random()))},
    {name: `Choose seats`, price: 9, choosen: Boolean(Math.round(Math.random()))},
  ][Math.floor(Math.random() * 4)],
});

export const eventsList = new Array(EVENTS_NUMBER).fill(``).map(createRoutePoint).sort((a, b) => a.date.start - b.date.start);

export const createMenu = () => ({
  menuItem: [`Table`, `Stats`],
  active: Boolean(Math.round(Math.random())),
});

export const createFilter = () => ({
  filterItem: [`EVERYTHING`, `FUTURE`, `PAST`],
  checked: Boolean(Math.round(Math.random())),
});

export function createRouteInfo() {
  if (eventsList.length !== 0) {
    return {
      dateStart: eventsList[0].date.start,
      dateEnd: eventsList[eventsList.length - 1].date.end,
      get cost() {
        let mainCost = eventsList.map((it) => it.price).reduce((previousValue, currentValue) => previousValue + currentValue);
        let additionalCost = eventsList.map((it) => it.options.price).reduce((previousValue, currentValue) => previousValue + currentValue);
        return mainCost + additionalCost;
      },

      get cities() {
        let citiesList = eventsList.map((it) => it.cityName[Math.floor(Math.random() * 8)]);
        let firstCity = citiesList[0];
        let lastCity = citiesList[citiesList.length - 1];
        const destinationCities = [firstCity, lastCity].join(` — ... — `);

        if (citiesList.length <= 3) {
          return citiesList.join(` — `);
        }
        return destinationCities;
      },
    };
  }
  return {
    dateStart: null,
    dateEnd: null,
    cost: 0,
    cities: ``,
  };
}

export const createSort = () => ({
  sortItem: [`EVENT`, `TIME`, `PRICE`, `OFFERS`],
  checked: Boolean(Math.round(Math.random())),
});

export function createRouteInfo(eventsList) {
  if (eventsList.length !== 0) {
    return {
      dateStart: eventsList[0].date.start,
      dateEnd: eventsList[eventsList.length - 1].date.end,
      get cost() {
        let mainCost = eventsList.map((it) => it.price).reduce((previousValue, currentValue) => previousValue + currentValue);
        let choosenOptions = [];
        eventsList.map((it) => it.options.map((option) => {
          if (option.choosen) {
            choosenOptions.push(option.price);
          }
        }));
        let additionalCost = choosenOptions.reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        }, 0);
        return mainCost + additionalCost;
      },

      get cities() {
        let citiesList = eventsList.map((it) => it[`cityDestination`]);
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


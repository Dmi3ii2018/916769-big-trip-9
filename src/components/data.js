const tripTypeImagesSrc = [`bus`, `drive`, `ship`];
//src=./src
export const getCard = () => ({
  tripType: [`bus`, `drive`, `ship`][Math.floor(Math.random() * 3)],
  activity: [`Check-in`, `Seeghtseeing`, `Restaurant`][Math.floor(Math.random() * 3)],
  tripTypeImage: `../public/img/icons/${tripTypeImagesSrc[Math.floor(Math.random()) * 3]}.png`,
  cityNames: ['Moscow', 'London', 'Paris'][Math.floor(Math.random() * 3)],
  cityImages: [`picsum.photos/300/150?r=${Math.random()}`],
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
    `In rutrum ac purus sit amet tempus.`],

  date: {
    start: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    end: Date.now() + 7 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  },

  price: Math.floor(Math.random() * 1000),

  options: [
    {name: `luggage`, price: 10, choosen: Boolean(Math.round(Math.random()))},
    {name: `Switch to comfort class`, price: 150, choosen: Boolean(Math.round(Math.random()))}
  ][Math.floor(Math.random() * 2)]
});

import {Menu} from "../src/components/menu.js";
import {Filter} from "../src/components/filter.js";
import {Stat} from "../src/components/stat.js";
import {TripController} from "../src/controllers/trip-controller.js";
import {TripInfo} from "../src/components/trip-info.js";
import {createRouteInfo} from "../src/components/data.js";
import {render, Position} from "../src/utils.js";
import {API} from "../src/api.js";

// console.log(new Date(`30/09/19 07:57`).getMilliseconds());

const AUTHORIZATION = `Basic dXNlcHSBxADkFwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
export let eventsList = api.getEvents();
console.log(api.getEvents());
// console.log(eventsList);

const filterContainer = document.querySelector(`.trip-main__trip-controls`);
const tripInfoContainer = document.querySelector(`.trip-main`);
const menuContainer = document.querySelector(`.trip-main__trip-controls`);

const renderTripInfo = (tripInfoData) => {
  const tripInfo = new TripInfo(tripInfoData);
  render(tripInfoContainer, tripInfo.getElement(), Position.AFTERBEGIN);
};

const renderMenu = () => {
  const menu = new Menu();
  render(menuContainer, menu.getElement(), Position.BEFOREEND);
};

const renderFilter = () => {
  const filter = new Filter();
  render(filterContainer, filter.getElement(), Position.BEFOREEND);
};


eventsList.then((result) => renderTripInfo(createRouteInfo(result)));
renderMenu();
renderFilter();

const eventContainer = document.querySelector(`.trip-events`);
eventsList.then((result) => {
  const tripController = new TripController(eventContainer, result);
  return tripController.init();
});

export const onDataChange = (actionType, update, newData) => {
  switch (actionType) {
    case `update`:
      api.updateEvent({
        id: update.id,
        data: update.toRaw(newData)
      }).then((result) => {
        const tripController = new TripController(eventContainer, result);
        return tripController.init();
      });
      break;
    case `delete`:
      api.deleteEvent({
        id: update.id
      })
        .then(() => api.getEvents())
        .then((result) => {
          console.log(result);
          eventContainer.innerHTML = ``;
          const tripController = new TripController(eventContainer, result);
          tripController.init();
          // tripController._renderDay(event, tripController.renderAllDays);
        });
      break;
  }
};

const renderStats = new Stat();
const statContainer = document.querySelector(`.page-body__page-main`).querySelector(`.page-body__container`);
render(statContainer, renderStats.getElement(), Position.BEFOREEND);

console.log(api.getDestination());
console.log(api.getOffers());
console.log(123);

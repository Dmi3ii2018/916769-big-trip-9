import {Menu} from "../src/components/menu.js";
import {Filter} from "../src/components/filter.js";
import {NewEvent} from "../src/components/new-event.js";
import {TripDay} from "../src/components/trip-day";
import {Sort} from "../src/components/sort.js";
import {TripController} from "../src/controllers/trip-controller.js";
import {TripInfo} from "../src/components/trip-info.js";
import {createRoutePoint, eventsList, createMenu, createFilter, createRouteInfo, createSort} from "../src/components/data.js";
import {render, Position} from "../src/utils.js";

const filterContainer = document.querySelector(`.trip-main__trip-controls`);
const sortContainer = document.querySelector(`.trip-events`);
const tripInfoContainer = document.querySelector(`.trip-main`);
const menuContainer = document.querySelector(`.trip-main__trip-controls`);
const tripDayContainer = document.querySelector(`.trip-events`);

const renderTripInfo = (tripInfoData) => {
  const tripInfo = new TripInfo(tripInfoData);
  render(tripInfoContainer, tripInfo.getElement(), Position.AFTERBEGIN);
};

const renderMenu = (menuData) => {
  const menu = new Menu(menuData);
  render(menuContainer, menu.getElement(), Position.BEFOREEND);
};

const renderFilter = (filterData) => {
  const filter = new Filter(filterData);
  render(filterContainer, filter.getElement(), Position.BEFOREEND);
};

const renderSort = (sortData) => {
  const sort = new Sort(sortData);
  render(sortContainer, sort.getElement(), Position.AFTERBEGIN);
};

// const renderTripDay = (tripDayInfo) => {
//   const tripDay = new TripDay(tripDayInfo);
//   render(tripDayContainer, tripDay.getElement(), Position.BEFOREEND);
// };

const checkEventPresent = (newEventData, eventsList) => {
  if (eventsList.length === 0) {
    const newEvent = new NewEvent(newEventData);
    render(tripDayContainer, newEvent.getElement(), Position.AFTERBEGIN);
  } else {
    const taskContainer = document.querySelector(`.trip-events`);
    const tripController = new TripController(taskContainer, eventsList);
    renderSort(createSort());
    tripController.init();
  }
};

renderTripInfo(createRouteInfo());
renderMenu(createMenu());
renderFilter(createFilter());
checkEventPresent(createRoutePoint(), eventsList);

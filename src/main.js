import {Menu} from "../src/components/menu.js";
import {Filter} from "../src/components/filter.js";
import {TripController} from "../src/controllers/trip-controller.js";
import {TripInfo} from "../src/components/trip-info.js";
import {eventsList, createMenu, createFilter, createRouteInfo} from "../src/components/data.js";
import {render, Position} from "../src/utils.js";

const filterContainer = document.querySelector(`.trip-main__trip-controls`);
const tripInfoContainer = document.querySelector(`.trip-main`);
const menuContainer = document.querySelector(`.trip-main__trip-controls`);

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

renderTripInfo(createRouteInfo());
renderMenu(createMenu());
renderFilter(createFilter());
const taskContainer = document.querySelector(`.trip-events`);
const tripController = new TripController(taskContainer, eventsList);
tripController.init();

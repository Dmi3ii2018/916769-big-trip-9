import {createMenuTemplate} from "../src/components/menu.js";
import {Filter} from "../src/components/filter.js";
import {createTripDayTemplate} from "../src/components/trip-day-item.js";
import {createEventEditor} from "../src/components/edit-form.js";
import {createTripEvent} from "../src/components/trip-event.js";
import {Sort} from "../src/components/sort.js";
import {TripInfo} from "../src/components/trip-info.js";
import {createRoutePoint, eventsList, createMenu, createFilter, createRouteInfo, createSort} from "../src/components/data.js";
import {render, Position} from "../src/utils.js";

const filterContainer = document.querySelector(`.trip-main__trip-controls`);
const sortContainer = document.querySelector(`.trip-events`);
const tripInfoContainer = document.querySelector(`.trip-main`);

const renderFilter = (filterData) => {
  const filter = new Filter(filterData);
  render(filterContainer, filter.getElement(), Position.BEFOREEND);
};

const renderSort = (sortData) => {
  const sort = new Sort(sortData);
  render(sortContainer, sort.getElement(), Position.AFTERBEGIN);
};

const renderTripInfo = (tripInfoData) => {
  const tripInfo = new TripInfo(tripInfoData);
  render(tripInfoContainer, tripInfo.getElement(), Position.AFTERBEGIN);
};

renderFilter(createFilter());
renderSort(createSort());
renderTripInfo(createRouteInfo());


// renderElement(`.trip-main`, `afterbegin`, createRouteInfo, createTripinfoTemplate);
// renderElement(`.trip-main__trip-controls`, `beforeend`, createMenu, createMenuTemplate);
// renderElement(`.trip-main__trip-controls`, `beforeend`, createFilter, createFilterTemplate);
// renderElement(`.trip-events`, `beforeend`, createSort, createSortTemplate);
// renderElement(`.trip-events`, `beforeend`, createRoutePoint, createTripDayTemplate);
// renderElement(`.trip-events__list`, `afterbegin`, () => eventsList[0], createEventEditor);
// renderEventPoint(`.trip-events__list`, `beforeend`, eventsList, createTripEvent);


import {Menu} from "../src/components/menu.js";
import {Filter} from "../src/components/filter.js";
import {TripDay} from "../src/components/trip-day-item.js";
import {EditForm} from "../src/components/edit-form.js";
import {TripEvent} from "../src/components/trip-event.js";
import {Sort} from "../src/components/sort.js";
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

const renderTripDay = (tripDayInfo) => {
  const tripDay = new TripDay(tripDayInfo);
  render(tripDayContainer, tripDay.getElement(), Position.BEFOREEND);
};

const renderTripEvent = (tripEventData) => {
  const tripEventContainer = document.querySelector(`.trip-events__list`);
  const tripEvent = new TripEvent(tripEventData);
  const editForm = new EditForm(tripEventData);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      if (editForm.getElement().parentNode === tripEventContainer) {
        tripEventContainer.replaceChild(tripEvent.getElement(), editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    }
  };

  tripEvent.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      tripEventContainer.replaceChild(editForm.getElement(), tripEvent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  editForm.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      tripEventContainer.replaceChild(tripEvent.getElement(), editForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  editForm.getElement().querySelector(`.event--edit`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      tripEventContainer.replaceChild(tripEvent.getElement(), editForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tripEventContainer, tripEvent.getElement(), Position.BEFOREEND);
};

renderTripInfo(createRouteInfo());
renderMenu(createMenu());
renderFilter(createFilter());
renderSort(createSort());
renderTripDay(createRoutePoint());
eventsList.map((event) => renderTripEvent(event));


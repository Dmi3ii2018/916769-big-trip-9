import {createMenuTemplate} from "../src/components/menu.js";
import {createFilterTemplate} from "../src/components/filter.js";
import {createTripDayTemplate} from "../src/components/trip-day-item.js";
import {createEventEditor} from "../src/components/edit-form.js";
import {createTripEvent} from "../src/components/trip-event.js";
import {createSortTemplate} from "../src/components/sort.js";
import {createTripinfoTemplate} from "../src/components/trip-info.js";
import {createRoutePoint, eventsList, createMenu, createFilter, createRouteInfo, createSort} from "../src/components/data.js";

const renderElement = (className, place, dataStructure, template, count = 1) => {
  let menuContainer = document.querySelector(className);

  menuContainer.insertAdjacentHTML(place, new Array(count)
    .fill(``)
    .map(dataStructure)
    .map(template)
    .join(``));
};

const renderEventPoint = (className, place, dataStructure, template) => {
  let menuContainer = document.querySelector(className);
  let eventData = dataStructure.map(((it, i) => i === 0 ? `` : template(it))).join(``);
  menuContainer.insertAdjacentHTML(place, eventData);
};

renderElement(`.trip-main`, `afterbegin`, createRouteInfo, createTripinfoTemplate);
renderElement(`.trip-main__trip-controls`, `beforeend`, createMenu, createMenuTemplate);
renderElement(`.trip-main__trip-controls`, `beforeend`, createFilter, createFilterTemplate);
renderElement(`.trip-events`, `beforeend`, createSort, createSortTemplate);
renderElement(`.trip-events`, `beforeend`, createRoutePoint, createTripDayTemplate);
renderElement(`.trip-events__list`, `afterbegin`, () => eventsList[0], createEventEditor);
renderEventPoint(`.trip-events__list`, `beforeend`, eventsList, createTripEvent);


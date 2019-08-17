import {createMenuTemplate} from "../src/components/menu.js";
import {createFilterTemplate} from "../src/components/filter.js";
import {createCardTemplate} from "../src/components/card.js";
import {createEvent} from "../src/components/edit-form.js";
import {createSortTemplate} from "../src/components/sort.js";
import {createTripinfoTemplate} from "../src/components/trip-info.js";
import {getCard} from "../src/components/data.js"

const renderElement = (className, place, dataStructure, template, count = 1) => {
  let menuContainer = document.querySelector(className);

  menuContainer.insertAdjacentHTML(place, new Array(count)
    .fill(``)
    .map(dataStructure)
    .map(template)
    .join(``)
  );
};

// renderElement(`.trip-main__trip-info`, `afterbegin`, createTripinfoTemplate());
// renderElement(`.trip-main__trip-controls`, `beforeend`, createMenuTemplate());
// renderElement(`.trip-main__trip-controls`, `beforeend`, createFilterTemplate());
// renderElement(`.trip-events`, `beforeend`, createSortTemplate());
  renderElement(`.trip-events`, `beforeend`, getCard, createEvent);
// renderElement(`.trip-events`, `beforeend`, createCardTemplate(), 3);

import {createMenuTemplate} from "../src/components/menu.js";
import {createFilterTemplate} from "../src/components/filter.js";
import {createCardTemplate} from "../src/components/card.js";
import {createEventEditorTemplate} from "../src/components/edit-form.js";
import {createSortTemplate} from "../src/components/sort.js";
import {createTripinfoTemplate} from "../src/components/trip-info.js";

const renderElement = function (className, place, createdContent, count = 1) {
  for (let i = 0; i < count; i++) {
    let menuContainer = document.querySelector(className);

    menuContainer.insertAdjacentHTML(place, createdContent);
  }
};

renderElement(`.trip-main__trip-info`, `afterbegin`, createTripinfoTemplate());
renderElement(`.trip-main__trip-controls`, `beforeend`, createMenuTemplate());
renderElement(`.trip-main__trip-controls`, `beforeend`, createFilterTemplate());
renderElement(`.trip-events`, `beforeend`, createSortTemplate());
renderElement(`.trip-events`, `beforeend`, createEventEditorTemplate());
renderElement(`.trip-events`, `beforeend`, createCardTemplate(), 3);

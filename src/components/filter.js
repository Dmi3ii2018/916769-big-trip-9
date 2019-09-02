import {createElement} from "../utils";

export class Filter {
  constructor({filterItem, checked}) {
    this._filterItem = filterItem;
    this._checked = checked;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">

        <div class="trip-filters__filter">
          <input id="filter-everything" ${this._checked ? `checked` : ``} class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" this._checked>
          <label class="trip-filters__filter-label" for="filter-everything">${this._filterItem[Math.floor(Math.random() * 3)]}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" ${this._checked ? `` : `checked`} class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
          <label class="trip-filters__filter-label" for="filter-future">${this._filterItem[Math.floor(Math.random() * 3)]}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
          <label class="trip-filters__filter-label" for="filter-past">${this._filterItem[Math.floor(Math.random() * 3)]}</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`;
  }
}

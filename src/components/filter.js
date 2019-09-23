import {AbstractComponent} from "./abstract-component";

export class Filter extends AbstractComponent {
  constructor({filterItem, checked}) {
    super();
    this._filterItem = filterItem;
    this._checked = checked;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">

        <div class="trip-filters__filter">
          <input id="filter-everything" checked class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" this._checked>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`;
  }
}

import {AbstractComponent} from "./abstract-component";

export class Filter extends AbstractComponent {
  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">

        <div class="trip-filters__filter">
          <input id="filter-everything" data-filter-type="default" class="trip-filters__filter-input" type="radio" name="trip-filter" value="everything">
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input" data-filter-type="future" type="radio" name="trip-filter" value="future">
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input" data-filter-type="past" type="radio" name="trip-filter" value="past">
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`;
  }
}

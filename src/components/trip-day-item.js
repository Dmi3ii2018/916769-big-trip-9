import {AbstractComponent} from "./abstract-component.js";

export class TripDay extends AbstractComponent {
  constructor({date}) {
    super();
    this._date = date;
  }

  getTemplate() {
    return `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">1</span>
          <time class="day__date" datetime=${new Date(this._date.start).toDateString()}>${new Date(this._date.start).toDateString()}</time>
        </div>
        <ul class="trip-events__list">

        </ul>
      </li>
    <ul>`;
  }
}

import {createElement} from "../utils.js";

export class TripInfo {
  constructor({cities, dateStart, dateEnd, cost}) {
    this._cities = cities;
    this._dateStart = dateStart;
    this._dateEnd = dateEnd;
    this._cost = cost;
    this.element = null;
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
    return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${this._cities}</h1>

      <p class="trip-info__dates">
        ${this._dateStart ? new Date(this._dateStart).toDateString() : ``}
        ${this._dateStart ? `&nbsp;—&nbsp` : ``}
        ${this._dateEnd ? new Date(this._dateEnd).toDateString() : ``}
      </p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${this._cost}</span>
    </p>
  </section>`;
  }
}


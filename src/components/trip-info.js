import {AbstractComponent} from "./abstract-component.js";
import moment from "moment";

export class TripInfo extends AbstractComponent {
  constructor({cities, dateStart, dateEnd, cost}) {
    super();
    this._cities = cities;
    this._dateStart = dateStart;
    this._dateEnd = dateEnd;
    this._cost = cost;
  }

  getTemplate() {
    return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${this._cities}</h1>

      <p class="trip-info__dates">
        ${this._dateStart ? moment(this._dateStart).format(`MMM DD`) : ``}
        ${this._dateStart ? `&nbsp;—&nbsp` : ``}
        ${this._dateEnd ? moment(this._dateEnd).format(`MMM DD`) : ``}
      </p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${this._cost}</span>
    </p>
  </section>`;
  }
}

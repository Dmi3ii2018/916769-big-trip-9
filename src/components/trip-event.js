import AbstractComponent from "./abstract-component.js";
import moment from "moment";

export default class TripEvent extends AbstractComponent {
  constructor({choosenTripType, tripTypeImage, date, price, options}) {
    super();
    this._choosenTripType = choosenTripType;
    this._tripTypeImage = tripTypeImage;
    this._date = date;
    this._price = price;
    this._options = options;
  }

  getTemplate() {
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._choosenTripType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._choosenTripType}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${this._date.start}">${moment(this._date.start).format(`h:mm`)}</time>
            &mdash;
            <time class="event_end-time" datetime="${this._date.end}">${moment(this._date.end).format(`h:mm`)}</time>
          </p>
          <p class="event__duration"></p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${this._options.filter((it) => it.choosen === true).slice(0, 3).map((option) => `<li class="event__offer">
        <span class="event__offer-title">${this._options ? option.title : ``}</span>
        ${this._options ? `&plus;&euro;` : ``}
        &nbsp;<span class="event__offer-price">${this._options ? option.price : ``}</span>
      </li>`).join(``)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
  }
}

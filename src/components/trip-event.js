import {createElement} from "../utils.js";

export class TripEvent {
  constructor({tripType, tripTypeImage, date, price, options}) {
    this._tripType = tripType;
    this._tripTypeImage = tripTypeImage;
    this._date = date;
    this._price = price;
    this._options = options;
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
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src=${this._tripTypeImage} alt="Event type icon">
        </div>
        <h3 class="event__title">${this._tripType}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${new Date(this._date.start).toDateString()}>${new Date(this._date.start).toDateString()}</time>
            &mdash;
            <time class="event__start-time" datetime=${new Date(this._date.end).toDateString()}>${new Date(this._date.end).toDateString()}</time>
          </p>
          <p class="event__duration">${Math.round((this._date.end - this._date.start) / 1000 / 60 / 60 / 24)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${this._options.choosen ? this._options.name : ``}</span>
            ${this._options.choosen ? `&plus;&euro;` : ``}
            &nbsp;<span class="event__offer-price">${this._options.choosen ? this._options.price : ``}</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
  }
}

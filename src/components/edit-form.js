import AbstractComponent from "./abstract-component.js";
import moment from "moment";

export default class EditForm extends AbstractComponent {
  constructor({tripType, activity, choosenTripType, isFavorite, tripTypeImage, cityName, cityDestination, cityImages, description, date, price, options}) {
    super();
    this._tripType = tripType;
    this._activity = activity;
    this._choosenTripType = choosenTripType;
    this._tripTypeImage = tripTypeImage;
    this._cityName = cityName;
    this._cityDestination = cityDestination;
    this._cityImages = cityImages;
    this._description = description;
    this._dateStart = date.start || ``;
    this._dateEnd = date.end || ``;
    this._price = price;
    this._options = options;
    this.isFavorite = isFavorite;
  }

  getTemplate() {
    return `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${this._choosenTripType ? this._choosenTripType : `bus`}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" value = ${this._choosenTripType ? this._choosenTripType : `bus`}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

            ${this._tripType.map((type) => `<div class="event__type-item">
              <input id="event-type-${type.toLowerCase()}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}">
              <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
            </div>`).join(``)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${this._activity.map((type) => `<div class="event__type-item">
                <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
                <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
              </div>`).join(``)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${this._choosenTripType ? this._choosenTripType : ``}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._cityDestination ? this._cityDestination : ``}" list="destination-list-1" required>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${this._dateStart ? moment(this._dateStart).format(`D/MM/YY h:mm`) : moment().format(`D/MM/YY h:mm`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${this._dateEnd ? moment(this._dateEnd).format(`D/MM/YY h:mm`) : moment().format(`D/MM/YY h:mm`)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" required name="event-price" value=${this._price ? this._price : ``}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this.isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
      </section>
    </form>
    </li>`;
  }
}

export const createTripEvent = ({tripType, tripTypeImage, date, price, options}) => {
  return `
  <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src=${tripTypeImage} alt="Event type icon">
      </div>
      <h3 class="event__title">${tripType}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${new Date(date.start).toDateString()}>${new Date(date.start).toDateString()}</time>
          &mdash;
          <time class="event__start-time" datetime=${new Date(date.end).toDateString()}>${new Date(date.end).toDateString()}</time>
        </p>
        <p class="event__duration">${Math.round((date.end - date.start) / 1000 / 60 / 60 / 24)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">${options.choosen ? options.name : ``}</span>
          ${options.choosen ? `&plus;&euro;` : ``}
          &nbsp;<span class="event__offer-price">${options.choosen ? options.price : ``}</span>
        </li>
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
};

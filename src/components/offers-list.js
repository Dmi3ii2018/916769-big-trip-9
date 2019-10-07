import {AbstractComponent} from "./abstract-component";

export class OffersList extends AbstractComponent {
  constructor({offers}) {
    super();
    this._offers = offers;
  }

  getTemplate() {
    return `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          ${this._offers.map((option) => `<div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden" data-offer-name="${option.title}" id="event-offer-${option.title}" type="checkbox" name="event-offer-luggage" ${option.choosen ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-${option.title}">
              <span class="event__offer-title">${option.title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
            </label>
          </div>`).join(``)}
          </div>
        </section>`;
  }
}

import AbstractComponent from "./abstract-component";

export default class DestinationDescription extends AbstractComponent {
  constructor({description, pictures}) {
    super();
    this.description = description;
    this.images = pictures;
  }

  getTemplate() {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${this.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${this.images.map((picture) => `<img class="event__photo" src=${picture.src} alt=${picture.description}>`).join(``)}
      </div>
    </div>
  </section>`;
  }
}

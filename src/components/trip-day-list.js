import {AbstractComponent} from "./abstract-component.js";

export class TripDaysList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}

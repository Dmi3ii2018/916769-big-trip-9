import {AbstractComponent} from "./abstract-component";

export class DayEventsList extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<ul class="trip-events__list"></ul>`;
  }
}

import {AbstractComponent} from "./abstract-component";

export class DayEventsList extends AbstractComponent {

  getTemplate() {
    return `<ul class="trip-events__list"></ul>`;
  }
}

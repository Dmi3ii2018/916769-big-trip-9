import AbstractComponent from "./abstract-component";

export default class DayEventsList extends AbstractComponent {

  getTemplate() {
    return `<ul class="trip-events__list"></ul>`;
  }
}

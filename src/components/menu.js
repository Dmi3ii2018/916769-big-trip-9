import {AbstractComponent} from "./abstract-component.js";

export class Menu extends AbstractComponent {
  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" data-view-type="table" href="#">Table</a>
      <a class="trip-tabs__btn" data-view-type="stats" href="#">Stats</a>
    </nav>`;
  }
}

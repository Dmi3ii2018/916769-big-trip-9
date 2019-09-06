import {AbstractComponent} from "./abstract-component.js";

export class Menu extends AbstractComponent {
  constructor({menuItem, active}) {
    super();
    this._menuItem = menuItem;
    this._active = active;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  ${this._active ? `trip-tabs__btn--active` : ``}" href="#">${this._menuItem[Math.round(Math.random())]}</a>
      <a class="trip-tabs__btn ${this._active ? `` : `trip-tabs__btn--active`}" href="#">${this._menuItem[Math.round(Math.random())]}</a>
    </nav>`;
  }
}

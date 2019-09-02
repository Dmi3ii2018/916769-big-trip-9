import {createElement} from "../utils.js";

export class Menu {
  constructor({menuItem, active}) {
    this._menuItem = menuItem;
    this._active = active;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  ${this._active ? `trip-tabs__btn--active` : ``}" href="#">${this._menuItem[Math.round(Math.random())]}</a>
      <a class="trip-tabs__btn ${this._active ? `` : `trip-tabs__btn--active`}" href="#">${this._menuItem[Math.round(Math.random())]}</a>
    </nav>`;
  }
}

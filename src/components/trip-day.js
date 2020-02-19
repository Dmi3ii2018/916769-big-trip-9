import AbstractComponent from "./abstract-component";
import moment from "moment";

export default class Day extends AbstractComponent {
  constructor(counter, date) {
    super();
    this._counter = counter;
    this._date = date.start || date;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._counter}</span>
        <time class="day__date" datetime="${new Date(this._date)}">${moment(this._date).format(`MMMM DD`)}</time>
      </div>
    </li>`;
  }
}

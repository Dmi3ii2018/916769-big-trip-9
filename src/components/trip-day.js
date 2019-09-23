import {AbstractComponent} from "./abstract-component";
import moment from "moment";

export class Day extends AbstractComponent {
  constructor(counter, {date}) {
    super();
    this._counter = counter;
    this._date = date;
    // this.time();
  }

  // time() {
  //   console.log(moment(this._date.start).format(`MMMM DD`));
  //   console.log(new Date(this._date.start));
  // }

  getTemplate() {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._counter}</span>
        <time class="day__date" datetime="${new Date(this._date.start)}">${moment(this._date.start).format(`MMMM DD`)}</time>
      </div>
    </li>`;
  }
}

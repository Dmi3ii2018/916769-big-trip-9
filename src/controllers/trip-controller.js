import {TripDaysList} from "../components/trip-day-list.js";
import {TripDay} from "../components/trip-day.js";
import {DayEventsList} from "../components/day-events-list.js";
import {TripEvent} from "../components/trip-event";
import {EditForm} from "../components/edit-form";
import {render, Position} from "../utils.js";

export class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._tripDaysList = new TripDaysList();
    this._tripDay = new TripDay(events[0]);
    this._dayEventsList = new DayEventsList();
  }

  init() {
    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
    render(this._tripDaysList.getElement(), this._tripDay.getElement(), Position.BEFOREEND);
    render(this._tripDay.getElement(), this._dayEventsList.getElement(), Position.BEFOREEND);

    this._events.forEach((event) => this._renderTripEvent(event));
  }

  _renderTripEvent(tripEventData) {
    const tripEventContainer = document.querySelector(`.trip-events__list`);
    const tripEvent = new TripEvent(tripEventData);
    const editForm = new EditForm(tripEventData);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {

        if (editForm.getElement().parentNode === tripEventContainer) {
          tripEventContainer.replaceChild(tripEvent.getElement(), editForm.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      }
    };

    tripEvent.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        tripEventContainer.replaceChild(editForm.getElement(), tripEvent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    editForm.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        tripEventContainer.replaceChild(tripEvent.getElement(), editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    editForm.getElement().querySelector(`.event--edit`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        tripEventContainer.replaceChild(tripEvent.getElement(), editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(tripEventContainer, tripEvent.getElement(), Position.BEFOREEND);
  }
}

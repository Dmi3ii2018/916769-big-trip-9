import {TripDaysList} from "../components/trip-day-list.js";
import {TripDay} from "../components/trip-day.js";
import {DayEventsList} from "../components/day-events-list.js";
import {TripEvent} from "../components/trip-event";
import {EditForm} from "../components/edit-form";
import {Sort} from "../components/sort.js";
import {NewEvent} from "../components/new-event.js";
import {render, Position} from "../utils.js";
import {createRoutePoint} from "../components/data.js";

export class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._tripDaysList = new TripDaysList();
    this._dayEventsList = new DayEventsList();
    this._sort = new Sort();
  }

  init() {
    if (this._events.length === 0) {
      const newEvent = new NewEvent(createRoutePoint());
      render(this._container, newEvent.getElement(), Position.AFTERBEGIN);
    } else {
      const tripDay = new TripDay(this._events[0]);
      render(this._container, this._sort.getElement(), Position.BEFOREEND);
      render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
      render(this._tripDaysList.getElement(), tripDay.getElement(), Position.BEFOREEND);
      render(tripDay.getElement(), this._dayEventsList.getElement(), Position.BEFOREEND);

      this._events.forEach((event) => this._renderTripEvent(event));

      this._sort.getElement().addEventListener(`change`, (evt) => this._onSortChange(evt));
    }
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

  _onSortChange(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this._dayEventsList.getElement().innerHTML = ``;

    let eventData;

    switch (evt.target.dataset.sortType) {
      case `time-up`: {
        eventData = this._events.slice().sort((a, b) => b.date.start - a.date.start);
        break;
      }
      case `price-up`: {
        eventData = this._events.slice().sort((a, b) => a.price - b.price);
        break;
      }
      case `default`: {
        eventData = this._events;
        break;
      }
    }

    eventData.forEach((eventMock) => this._renderTripEvent(eventMock));
  }
}

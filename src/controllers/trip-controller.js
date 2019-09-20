import {TripDaysList} from "../components/trip-day-list.js";
import {Day} from "../components/trip-day.js";
import {DayEventsList} from "../components/day-events-list.js";
import {PointController} from "../components/point-controller.js";
import {Sort} from "../components/sort.js";
import {Stat} from "../components/stat.js";
import {Menu} from "../components/menu.js";
import {render, Position, unrender} from "../utils.js";
import {createRoutePoint} from "../components/data.js";

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._tripDaysList = new TripDaysList();
    this._dayEventsList = new DayEventsList();
    this._sort = new Sort();
    this._stat = new Stat();
    this._menu = new Menu();
    this._Day = new Day(1, this._events[0]);

    this._creatingEvent = null;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    // if (this._events.length === 0) {
    //   const newEvent = new NewEvent(createRoutePoint());
    //   render(this._container, newEvent.getElement(), Position.AFTERBEGIN);
    // } else {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
    render(this._tripDaysList.getElement(), this._Day.getElement(), Position.BEFOREEND);
    render(this._Day.getElement(), this._dayEventsList.getElement(), Position.BEFOREEND);

    this._events.forEach((event) => this._renderTripEvent(event));

    document.querySelector(`.trip-main__trip-controls`).addEventListener(`click`, (evt) => this._onMenuClick(evt));

    this._sort.getElement().addEventListener(`change`, (evt) => this._onSortChange(evt));

    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => this._onNewTaskClick(evt));
    // }
  }

  _renderDay(tripEvents) {
    unrender(this._dayEventsList.getElement());

    this._dayEventsList.removeElement();
    render(this._Day.getElement(), this._dayEventsList.getElement(), Position.BEFOREEND);

    tripEvents.forEach((it) => this._renderTripEvent(it));
  }

  _renderTripEvent(tripEventData) {
    const pointController = new PointController(this._dayEventsList, tripEventData, Mode.DEFAULT, this._onDataChange, this._onChangeView);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    const index = this._events.findIndex((it) => it === oldData);
    if (newData === null && oldData === null) {
      this._creatingEvent = null;
    } else if (newData === null) {
      this._events = [...this._events.slice(0, index), ...this._events.slice(index + 1)];
    } else if (oldData === null) {
      this._creatingEvent = null;
      this._events = [newData, ...this._events];
    } else {
      this._events[index] = newData;
    }

    this._renderDay(this._events);
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

  _onMenuClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    let menuItems = document.querySelectorAll(`.trip-tabs__btn`);
    menuItems.forEach((it) => it.classList.remove(`trip-tabs__btn--active`));
    const eventsContainer = document.querySelector(`.trip-events`);

    switch (evt.target.textContent) {
      case `Stats`: {
        evt.target.classList.add(`trip-tabs__btn--active`);
        document.querySelector(`.statistics`).classList.remove(`visually-hidden`);

        eventsContainer.classList.add(`trip-events--hidden`);
        break;
      }
      case `Table`: {
        evt.target.classList.add(`trip-tabs__btn--active`);
        eventsContainer.classList.remove(`trip-events--hidden`);
        document.querySelector(`.statistics`).classList.add(`visually-hidden`);
        break;
      }
    }
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }
    const defaultEvent = createRoutePoint();
    this._creatingEvent = new PointController(this._dayEventsList, defaultEvent, Mode.ADDING, this._onDataChange, this._onChangeView);
  }

  _onNewTaskClick(evt) {
    evt.preventDefault();
    this.createEvent();
  }
}

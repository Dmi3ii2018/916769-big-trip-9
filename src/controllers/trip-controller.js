import {TripDaysList} from "../components/trip-day-list.js";
import {Day} from "../components/trip-day.js";
import {DayEventsList} from "../components/day-events-list.js";
import {PointController} from "../components/point-controller.js";
import {Sort} from "../components/sort.js";
import {render, Position, unrender} from "../utils.js";

export class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._tripDaysList = new TripDaysList();
    this._dayEventsList = new DayEventsList();
    this._sort = new Sort();
    this._Day = new Day(this._events[0]);

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

    this._sort.getElement().addEventListener(`change`, (evt) => this._onSortChange(evt));
    // }
  }

  _renderDay(tripEvents) {
    unrender(this._dayEventsList.getElement());

    this._dayEventsList.removeElement();
    render(this._Day.getElement(), this._dayEventsList.getElement(), Position.BEFOREEND);

    tripEvents.forEach((it) => this._renderTripEvent(it));
  }

  _renderTripEvent(tripEventData) {
    const pointController = new PointController(this._dayEventsList, tripEventData, this._onDataChange, this._onChangeView);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._events[this._events.findIndex((it) => it === oldData)] = newData;

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
}

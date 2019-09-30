import {TripDaysList} from "../components/trip-day-list.js";
import {Day} from "../components/trip-day.js";
import {DayEventsList} from "../components/day-events-list.js";
import {PointController} from "../components/point-controller.js";
import {Sort} from "../components/sort.js";
import {Stat} from "../components/stat.js";
import {Menu} from "../components/menu.js";
import {Filter} from "../components/filter.js";
import {render, Position, unrender} from "../utils.js";
// import {createRoutePoint} from "../components/data.js";
import {getStatistics} from "../stat-controller.js";
import moment from "moment";

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
    this._filter = new Filter();
    this.Day = new Day(1, this._events[0]);

    this._creatingEvent = null;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    // this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    // if (this._events.length === 0) {
    //   const newEvent = new NewEvent(createRoutePoint());
    //   render(this._container, newEvent.getElement(), Position.AFTERBEGIN);
    // } else {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
    render(this._tripDaysList.getElement(), this.Day.getElement(), Position.BEFOREEND);
    render(this.Day.getElement(), this._dayEventsList.getElement(), Position.BEFOREEND);

    this._events.forEach((it) => this.renderAllDays(it));

    document.querySelector(`.trip-controls__trip-tabs`).addEventListener(`click`, (evt) => this._onMenuClick(evt));

    document.querySelector(`.trip-filters`).addEventListener(`change`, (evt) => this._onFilterClick(evt));

    this._sort.getElement().addEventListener(`change`, (evt) => this._onSortChange(evt));

    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => this._onNewTaskClick(evt));
    // }
  }

  _renderDay(tripEvents, callback) {
    unrender(this._tripDaysList.getElement());

    this._tripDaysList.removeElement();
    this.Day.removeElement();
    this._dayEventsList.removeElement();
    this.Day = new Day(1, tripEvents[0]);
    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
    render(this._tripDaysList.getElement(), this.Day.getElement(), Position.BEFOREEND);
    render(this.Day.getElement(), this._dayEventsList.getElement(), Position.BEFOREEND);

    tripEvents.forEach((it) => callback.call(this, it));
  }

  _renderTripEvent(tripEventData) {
    const pointController = new PointController(this._dayEventsList, tripEventData, Mode.DEFAULT, this._onDataChange, this._onChangeView);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  // _onDataChange(newData, oldData) {
  //   const index = this._events.findIndex((it) => it === oldData);
  //   if (newData === null && oldData === null) {
  //     this._creatingEvent = null;
  //   } else if (newData === null) {
  //     this._events = [...this._events.slice(0, index), ...this._events.slice(index + 1)];
  //   } else if (oldData === null) {
  //     this._creatingEvent = null;
  //     this._events = [newData, ...this._events];
  //   } else {
  //     this._events[index] = newData;
  //   }
  //   this._events = this._events.sort((a, b) => a.date.start - b.date.start);
  //   this._renderDay(this._events, this.renderAllDays);
  // }

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
        this._renderDay(eventData, this._renderTripEvent);
        break;
      }
      case `price-up`: {
        eventData = this._events.slice().sort((a, b) => a.price - b.price);
        this._renderDay(eventData, this._renderTripEvent);
        break;
      }
      case `default`: {
        eventData = this._events;
        eventData.forEach((eventMock) => this.renderAllDays(eventMock));
        break;
      }
    }
  }

  _onMenuClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    let menuItems = document.querySelectorAll(`.trip-tabs__btn`);
    menuItems.forEach((it) => it.classList.remove(`trip-tabs__btn--active`));
    const eventsContainer = document.querySelector(`.trip-events`);

    switch (evt.target.dataset.viewType) {
      case `stats`: {
        const moneyCtx = document.querySelector(`.statistics__chart--money`);
        const transportCtx = document.querySelector(`.statistics__chart--transport`);
        const timeSpentCtx = document.querySelector(`.statistics__chart--time`);

        evt.target.classList.add(`trip-tabs__btn--active`);
        document.querySelector(`.statistics`).classList.remove(`visually-hidden`);

        eventsContainer.classList.add(`trip-events--hidden`);

        getStatistics(moneyCtx, transportCtx, timeSpentCtx);

        break;
      }
      case `table`: {
        evt.target.classList.add(`trip-tabs__btn--active`);
        eventsContainer.classList.remove(`trip-events--hidden`);
        document.querySelector(`.statistics`).classList.add(`visually-hidden`);
        break;
      }
    }
  }

  _onFilterClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    let eventData;
    let currentTime = Date.now();

    switch (evt.target.dataset.filterType) {
      case `future`: {
        eventData = this._events.filter((it) => it.date.start > currentTime);
        if (eventData.length === 0) {
          let pastText = `There is no events of future`;
          unrender(this._tripDaysList.getElement());
          this._tripDaysList.removeElement();
          this._tripDaysList.getElement().setAttribute(`style`, `padding-top: 40px; text-align: center;`);
          render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
          render(this._tripDaysList.getElement(), pastText, Position.BEFOREEND);
        } else {
          this._renderDay(eventData, this.renderAllDays);
        }
        break;
      }
      case `past`: {
        eventData = this._events.filter((it) => it.date.end < currentTime);
        if (eventData.length === 0) {
          let pastText = `There is no events of past`;
          unrender(this._tripDaysList.getElement());
          this._tripDaysList.removeElement();
          this._tripDaysList.getElement().setAttribute(`style`, `padding-top: 40px; text-align: center;`);
          render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
          render(this._tripDaysList.getElement(), pastText, Position.BEFOREEND);
        } else {
          this._renderDay(eventData, this.renderAllDays);
        }
        break;
      }
      case `default`: {
        eventData = this._events;
        this._renderDay(eventData, this.renderAllDays);
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
    this._onChangeView();
    this.createEvent();
  }

  renderAllDays(item) {
    let timeData = moment(item.date.start).format(`MM DD`);
    let dayTime = document.querySelectorAll(`.day__date`);
    let index = dayTime.length - 1;

    if (timeData <= moment(dayTime[index].dateTime).format(`MM DD`)) {
      this._renderTripEvent(item);
    } else {
      let day = new Day(index + 2, item);
      let eventList = new DayEventsList();
      render(this._tripDaysList.getElement(), day.getElement(), Position.BEFOREEND);
      render(day.getElement(), eventList.getElement(), Position.BEFOREEND);
      this._renderTripEvent(item);
    }
  }
}

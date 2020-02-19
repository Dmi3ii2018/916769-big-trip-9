import TripDaysList from "../components/trip-day-list.js";
import Day from "../components/trip-day.js";
import DayEventsList from "../components/day-events-list.js";
import PointController from "../controllers/point-controller.js";
import Sort from "../components/sort.js";
import Stat from "../components/stat.js";
import Menu from "../components/menu.js";
import {eventsList} from "../main.js";
import Filter from "../components/filter.js";
import {render, Position, unrender} from "../utils.js";
import {getStatistics} from "../stat-controller.js";
import moment from "moment";

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export default class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events.sort((a, b) => a.date.start - b.date.start);
    this._tripDaysList = new TripDaysList();
    this.dayEventsList = new DayEventsList();
    this._sort = new Sort();
    this._stat = new Stat();
    this._menu = new Menu();
    this._filter = new Filter();
    // this.Day = new Day(1, this._events[0]) || null;

    this._creatingEvent = null;
    this.eventsList = null;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
  }

  init() {
    if (this._events.length === 0) {
      eventsList.then((result) => {
        this._eventsList = result;
      });
      let pastText = `Click \"New Event\" to create your first point`;
      unrender(this._tripDaysList.getElement());
      this._tripDaysList.removeElement();
      this._tripDaysList.getElement().setAttribute(`style`, `padding-top: 40px; text-align: center;`);
      document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => this._onNewEventClick(evt));
      render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
      render(this._tripDaysList.getElement(), pastText, Position.BEFOREEND);
    } else {
      this._day = new Day(1, this._events[0].date);
      this._day.getElement();
      render(this._container, this._sort.getElement(), Position.BEFOREEND);
      render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
      render(this._tripDaysList.getElement(), this._day.getElement(), Position.BEFOREEND);
      render(this._day.getElement(), this.dayEventsList.getElement(), Position.BEFOREEND);

      this._events.forEach((it) => this.renderAllDays(it));

      document.querySelector(`.trip-controls__trip-tabs`).addEventListener(`click`, (evt) => this._onMenuClick(evt));

      document.querySelector(`.trip-filters`).addEventListener(`change`, (evt) => this._onFilterClick(evt));

      this._sort.getElement().addEventListener(`change`, (evt) => this._onSortChange(evt));

      document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => this._onNewEventClick(evt));

      eventsList.then((result) => {
        this._eventsList = result;
      });
    }
  }

  _renderDay(tripEvents, callback) {
    unrender(this._tripDaysList.getElement());
    this._tripDaysList.removeElement();
    this._day.removeElement();
    this.dayEventsList.removeElement();
    this._day = new Day(1, tripEvents[0]);
    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
    render(this._tripDaysList.getElement(), this._day.getElement(), Position.BEFOREEND);
    render(this._day.getElement(), this.dayEventsList.getElement(), Position.BEFOREEND);

    tripEvents.forEach((it) => callback.call(this, it));
  }

  _renderTripEvent(tripEventData) {
    const pointController = new PointController(this.dayEventsList, tripEventData, Mode.DEFAULT, this._onChangeView);
    this._subscriptions.unshift(pointController.setDefaultView.bind(pointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onSortChange(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this.dayEventsList.getElement().innerHTML = ``;

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
        eventData = this._events.slice().sort((a, b) => a.date.start - b.date.start);
        this._renderDay(eventData, this.renderAllDays);
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
        eventData = this._events.filter((it) => it.date.start > currentTime).sort((a, b) => a.date.start - b.date.start);
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
        eventData = this._events.filter((it) => it.date.end < currentTime).sort((a, b) => a.date.start - b.date.start);
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
    if (this._events.length === 0) {
      let dayList = this._tripDaysList.getElement();
      dayList.innerText = ``;
      let date = new Date();
      this._day = new Day(1, date);
      render(dayList, this._day.getElement(), Position.BEFOREEND);
      render(this._day.getElement(), this.dayEventsList.getElement(), Position.BEFOREEND);
    }
    const defaultEvent = {
      tripType: [`Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
      activity: [`Check-in`, `Sightseeing`, `Restaurant`],
      date: {
        start: null,
        end: null,
      },
      id: String(this._eventsList.length),
    };
    const creatEvent = new PointController(this.dayEventsList, defaultEvent, Mode.ADDING, this._onDataChange, this._onChangeView);
    this._subscriptions.unshift(creatEvent.setDefaultView.bind(creatEvent));
    this._creatingEvent = creatEvent;
  }

  _onNewEventClick(evt) {
    evt.preventDefault();
    this.createEvent();
  }

  renderAllDays(item) {
    let timeData = moment(item.date.start).format(`MM DD`);
    let dayTime = document.querySelectorAll(`.day__date`);
    let index = dayTime.length - 1;

    if (timeData <= moment(dayTime[index].dateTime).format(`MM DD`)) {
      this._renderTripEvent(item);
    } else {
      let day = new Day(index + 2, item.date);
      this.dayEventsList = new DayEventsList();
      render(this._tripDaysList.getElement(), day.getElement(), Position.BEFOREEND);
      render(day.getElement(), this.dayEventsList.getElement(), Position.BEFOREEND);
      this._renderTripEvent(item);
    }
  }
}

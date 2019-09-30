import {TripEvent} from "../components/trip-event";
import {EditForm} from "../components/edit-form";
// import {NewEvent} from "../components/new-event.js";
import {render, Position} from "../utils.js";
// import {createRoutePoint} from "../components/data.js";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from "moment";

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export class PointController {
  constructor(container, data, mode, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;

    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this._tripEvent = new TripEvent(data);
    this._editForm = new EditForm(data);
    // this._newEvent = new NewEvent(data);

    this.init(mode);
    this._checkDuration();
    this._checkPlaceholder();
    this._changeForm();
  }

  init(mode) {
    const tripEventContainer = document.querySelectorAll(`.trip-events__list`);
    let renderPosition = Position.BEFOREEND;
    let currentView = this._tripEvent;

    if (mode === Mode.ADDING) {
      renderPosition = Position.AFTERBEGIN;
      currentView = this._editForm;
      currentView.getElement().querySelector(`.event__reset-btn`).textContent = `Cancel`;
      currentView.getElement().querySelector(`.event__input--price`).value = ``;
      currentView.getElement().querySelector(`.event__favorite-btn`).classList.add(`visually-hidden`);
      currentView.getElement().querySelector(`.event__rollup-btn`).style = `display: none`;
    }


    this._fp = flatpickr(this._editForm.getElement().querySelectorAll(`.event__input--time`), {
      allowInput: true,
      // minDate: `today`,
      dateFormat: `d/m/y H:i`,
      enableTime: true,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {

        if (this._editForm.getElement().parentNode === tripEventContainer[tripEventContainer.length - 1]) {
          tripEventContainer[tripEventContainer.length - 1].replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      }
    };

    this._tripEvent.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._editForm.getElement().querySelector(`.event__reset-btn`).textContent = `Delete`;
        this._editForm.getElement().querySelector(`.event__favorite-btn`).classList.remove(`visually-hidden`);
        this._editForm.getElement().querySelector(`.event__rollup-btn`).style = `display: block`;
        tripEventContainer[tripEventContainer.length - 1].replaceChild(this._editForm.getElement(), this._tripEvent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        tripEventContainer[tripEventContainer.length - 1].replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement().querySelector(`.event--edit`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        tripEventContainer[tripEventContainer.length - 1].replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement().querySelector(`.event__save-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        // const formData = new FormData(this._editForm.getElement().querySelector(`.event--edit`));

        // const startTime = this._fp[0].parseDate(formData.get(`event-start-time`), `d.m.y H:i`);
        // const endTime = this._fp[0].parseDate(formData.get(`event-end-time`), `d.m.y H:i`);

        // const entry = {
        //   tripType: createRoutePoint().tripType,
        //   choosenTripType: formData.get(`event-type`) || this._editForm.getElement().querySelector(`.event__type-toggle`).value,
        //   activity: createRoutePoint().activity,
        //   tripTypeImage: createRoutePoint().tripTypeImage,
        //   cityName: createRoutePoint().cityName,
        //   cityDestination: formData.get(`event-destination`),
        //   cityImages: createRoutePoint().cityImages,
        //   description: createRoutePoint().description,
        //   date: {
        //     start: new Date(startTime),
        //     end: new Date(endTime),
        //   },
        //   price: formData.get(`event-price`),
        //   options: createRoutePoint().options,
        // };

        this._onDataChange(entry, mode === Mode.DEFAULT ? this._data : null);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
      if (mode === Mode.ADDING) {
        this._onDataChange(null, null);
      } else {
        this._onDataChange(null, this._data);
      }
    });

    if (mode === Mode.ADDING) {
      render(tripEventContainer[0], currentView.getElement(), renderPosition);
    } else {
      render(tripEventContainer[tripEventContainer.length - 1], currentView.getElement(), renderPosition);
    }
  }

  _checkPlaceholder() {
    const placeholder = this._editForm.getElement().querySelector(`.event__label`).textContent.trim();
    const destination = this._editForm.getElement().querySelector(`.event__input--destination`).value;

    let prep;
    if (this._data.activity.some((type) => type.toLowerCase() === placeholder)) {
      prep = ` in `;
    } else {
      prep = ` to `;
    }
    this._editForm.getElement().querySelector(`.event__label`).textContent = placeholder + prep;
    this._tripEvent.getElement().querySelector(`.event__title`).textContent = placeholder + prep + destination;
  }

  _changeForm() {
    const tripTypeList = this._editForm.getElement().querySelectorAll(`.event__type-input`);

    tripTypeList.forEach((it) => it.addEventListener(`change`, (evt) => {
      this._editForm.getElement().querySelector(`.event__type-toggle`).checked = false;
      this._editForm.getElement().querySelector(`.event__type-icon`).src = `img/icons/${evt.target.value}.png`;
      this._editForm.getElement().querySelector(`.event__label`).textContent = evt.target.value;
      this._checkPlaceholder();
    }));
  }

  _checkDuration() {
    const durationField = this._tripEvent.getElement().querySelector(`.event__duration`);
    let duration = (this._data.date.end - this._data.date.start) / 1000 / 60 / 60;
    const momentDuration = moment(this._data.date.end - this._data.date.start)
    .utc()
    .subtract(1, `days`);

    if (duration >= 24) {
      duration = momentDuration.format(`D[D] HH[H] mm[M]`);
    } else if (duration < 1 && duration >= 0) {
      duration = momentDuration.format(`mm[M]`);
    } else if (duration < 24) {
      duration = momentDuration.format(`HH[H] mm[M]`);
    }

    durationField.textContent = duration;
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._editForm.getElement())) {
      this._container.getElement().replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
    }
  }
}


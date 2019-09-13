import {TripEvent} from "../components/trip-event";
import {EditForm} from "../components/edit-form";
import {render, Position} from "../utils.js";
import {createRoutePoint} from "../components/data.js";
import moment from "moment";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export class PointController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._tripEvent = new TripEvent(data);
    this._editForm = new EditForm(data);

    this.init();
    this._checkPlaceholder();
    this._changeForm();
  }

  init() {
    const tripEventContainer = document.querySelector(`.trip-events__list`);

    this._fp = flatpickr(this._editForm.getElement().querySelectorAll(`.event__input--time`), {
      // altInput: true,
      allowInput: true,
      minDate: `today`,
      dateFormat: `d.m.y H:i`,
      // defaultDate: `today`,
      enableTime: true,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {

        if (this._editForm.getElement().parentNode === tripEventContainer) {
          tripEventContainer.replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      }
    };

    this._tripEvent.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        tripEventContainer.replaceChild(this._editForm.getElement(), this._tripEvent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        tripEventContainer.replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement().querySelector(`.event--edit`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        tripEventContainer.replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement().querySelector(`.event__save-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const formData = new FormData(this._editForm.getElement().querySelector(`.event--edit`));

        const startTime = this._fp[0].parseDate(formData.get(`event-start-time`), `d.m.y H:i`);
        const endTime = this._fp[0].parseDate(formData.get(`event-end-time`), `d.m.y H:i`);

        const entry = {
          tripType: createRoutePoint().tripType,
          choosenTripType: formData.get(`event-type`) || this._editForm.getElement().querySelector(`.event__type-toggle`).value,
          activity: createRoutePoint().activity,
          tripTypeImage: createRoutePoint().tripTypeImage,
          cityName: createRoutePoint().cityName,
          cityDestination: formData.get(`event-destination`),
          cityImages: createRoutePoint().cityImages,
          description: createRoutePoint().description,
          date: {
            start: new Date(startTime),
            end: new Date(endTime),
          },
          price: formData.get(`event-price`),
          options: createRoutePoint().options,
        };
        console.log(formData.get(`event-start-time`));

        this._onDataChange(entry, this._data);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(tripEventContainer, this._tripEvent.getElement(), Position.BEFOREEND);
  }

  _checkPlaceholder() {
    const placeholder = this._editForm.getElement().querySelector(`.event__label`).textContent.trim();
    const destination = this._editForm.getElement().querySelector(`.event__input--destination`).value;

    let prep;
    if (this._data.activity.some((type) => type === placeholder)) {
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

  setDefaultView() {
    if (this._container.getElement().contains(this._editForm.getElement())) {
      this._container.getElement().replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
    }
  }
}


import {TripEvent} from "../components/trip-event";
import {EditForm} from "../components/edit-form";
import {render, Position} from "../utils.js";
import {createRoutePoint} from "../components/data.js";

export class PointController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._tripEvent = new TripEvent(data);
    this._editForm = new EditForm(data);

    this.init();
    this._changeForm();
  }

  init() {
    const tripEventContainer = document.querySelector(`.trip-events__list`);

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

        const entry = {
          tripType: createRoutePoint().tripType,
          choosenTripType: formData.get(`event-type`),
          activity: createRoutePoint().activity,
          tripTypeImage: createRoutePoint().tripTypeImage,
          cityName: createRoutePoint().cityName,
          cityDestination: formData.get(`event-destination`),
          cityImages: createRoutePoint().cityImages,
          description: createRoutePoint().description,
          date: {
            start: new Date(formData.get(`event-start-time`)),
            end: new Date(formData.get(`event-end-time`)),
          },
          price: formData.get(`event-price`),
          options: createRoutePoint().options,
        };

        this._onDataChange(entry, this._data);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(tripEventContainer, this._tripEvent.getElement(), Position.BEFOREEND);
  }

  _changeForm() {
    const tripTypeList = this._editForm.getElement().querySelectorAll(`.event__type-input`);

    tripTypeList.forEach((it) => it.addEventListener(`change`, (evt) => {
      let prep;
      if (this._data.activity.some((type) => type === evt.target.value)) {
        prep = `in`;
      } else {
        prep = `to`;
      }
      this._editForm.getElement().querySelector(`.event__type-toggle`).checked = false;
      this._editForm.getElement().querySelector(`.event__type-icon`).src = `img/icons/${evt.target.value}.png`;
      this._editForm.getElement().querySelector(`.event__label`).textContent = `${evt.target.value + ` ` + prep}`;
    }));


  }

  setDefaultView() {
    if (this._container.getElement().contains(this._editForm.getElement())) {
      this._container.getElement().replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
    }
  }
}


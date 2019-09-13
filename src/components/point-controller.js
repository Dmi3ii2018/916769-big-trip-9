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
    this._checkPlaceholder();
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

      evt.target.checked = true;
      this._editForm.getElement().querySelector(`.event__type-toggle`).checked = false;
      this._editForm.getElement().querySelector(`.event__type-icon`).src = `img/icons/${evt.target.value}.png`;
      this._editForm.getElement().querySelector(`.event__label`).textContent = evt.target.value;
      this._checkPlaceholder();
      const offers = this._editForm.getElement().querySelector(`.event__available-offers`);
      offers.innerHTML = `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
        <lab8el class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${this._data.options.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${this._data.options.price}</span>
        </label>
      </div>`;
    }));


  }

  setDefaultView() {
    if (this._container.getElement().contains(this._editForm.getElement())) {
      this._container.getElement().replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
    }
  }
}


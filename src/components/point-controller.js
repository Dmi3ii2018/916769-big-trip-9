import {TripEvent} from "../components/trip-event";
import {EditForm} from "../components/edit-form";
import {DestinationList} from "../components/destination-list.js";
import {DestinationDescription} from "../components/destination-description.js";
// import {NewEvent} from "../components/new-event.js";
import {render, Position, unrender} from "../utils.js";
import {eventsList} from "../main.js";
import {onDataChange} from "../main.js";
import {destinationData} from "../main.js";
import {offersItems} from "../main.js";
// import {createRoutePoint} from "../components/data.js";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from "moment";
import {OffersList} from "./offers-list";

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

const ActionType = {
  CREATE: `create`,
  UPDATE: `update`,
  DELETE: `delete`
};

export class PointController {
  constructor(container, data, mode, onChangeView) {
    this._container = container;
    this._data = data;
    this._offersData = null;
    this.eventsList = null;
    this._entry = null;
    this._onChangeView = onChangeView;
    // this._onDataChange = onDataChange;

    this._tripEvent = new TripEvent(data);
    this._editForm = new EditForm(data);
    // this._newEvent = new NewEvent(data);

    this.init(mode);
    this._changeForm();
  }

  init(mode) {
    const tripEventContainer = document.querySelectorAll(`.trip-events__list`);
    let renderPosition = Position.BEFOREEND;
    let currentView = this._tripEvent;

    offersItems.then((result) => {
      this._offersData = result;
    });
    eventsList.then((result) => {
      this._eventsList = result;
    });

    if (mode === Mode.ADDING) {
      renderPosition = Position.AFTERBEGIN;
      currentView = this._editForm;
      currentView.getElement().querySelector(`.event__reset-btn`).textContent = `Cancel`;
      currentView.getElement().querySelector(`.event__input--price`).value = ``;
      currentView.getElement().querySelector(`.event__favorite-btn`).classList.add(`visually-hidden`);
      currentView.getElement().querySelector(`.event__rollup-btn`).style = `display: none`;
      this._checkPlaceholder(true);

    } else {
      this._checkDuration();
      this._checkPlaceholder();

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
    }

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {

        if (this._editForm.getElement().parentNode === tripEventContainer[tripEventContainer.length - 1]) {
          tripEventContainer[tripEventContainer.length - 1].replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      }
    };

    this._fp = flatpickr(this._editForm.getElement().querySelectorAll(`.event__input--time`), {
      allowInput: true,
      // minDate: `today`,
      dateFormat: `d/m/y H:i`,
      enableTime: true,
    });

    this._editForm.getElement().querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => this.setDescription(evt));

    this._editForm.getElement().querySelector(`.event--edit`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        tripEventContainer[tripEventContainer.length - 1].replaceChild(this._tripEvent.getElement(), this._editForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement().querySelector(`.event__save-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const formData = new FormData(this._editForm.getElement().querySelector(`.event--edit`));

        this.resetOptions();

        if (mode === Mode.ADDING) {

          const imagesList = Array.from(this._editForm.getElement().querySelectorAll(`.event__photo`));
          const eventDescription = this._editForm.getElement().querySelector(`.event__destination-description`) ? this._editForm.getElement().querySelector(`.event__destination-description`).textContent : ``;
          let offersData = this._offersData.filter((it) => it.type === formData.get(`event-type`) ? formData.get(`event-type`).toLowerCase() : document.querySelector(`.event__type-toggle`).value);

          const picturesData = imagesList.map((picture) => ({
            src: picture.src,
            description: picture.alt,
          }));
          // console.log(picturesData);
          // console.log(offersData);

          // const startTime = this._fp[0].parseDate(formData.get(`event-start-time`), `d.m.y H:i`);
          // const endTime = this._fp[0].parseDate(formData.get(`event-end-time`), `d.m.y H:i`);

          this._entry = {
            'base_price': Number(formData.get(`event-price`)),
            'date_from': Number(moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).format(`x`)),
            'date_to': Number(moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).format(`x`)),
            'destination': {
              'name': formData.get(`event-destination`),
              'pictures': picturesData, // rewrite
              'description': eventDescription || ``, // rewrite
            },
            'id': String(this._eventsList.length),
            'is_favorite': formData.get(`event-favorite`) ? true : false,
            'offers': offersData[0].offers.map((it) => ({
              title: it.title,
              price: it.price,
              accepted: it.choosen || false,
            })),
            'type': formData.get(`event-type`) ? formData.get(`event-type`).toLowerCase() : document.querySelector(`.event__type-toggle`).value,
          };

          // console.log(this._entry);
          onDataChange(ActionType.CREATE, this._data, this._entry);

        } else {
          onDataChange(ActionType.UPDATE, this._data, formData);
        }

        // this._onChangeView();

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      // console.log(this._data);
      if (mode === Mode.ADDING) {
        // unrender(this._editForm.getElement());
        // this._editForm.removeElement();
        onDataChange(Mode.DEFAULT);
      } else {
        onDataChange(ActionType.DELETE, this._data);
      }
    });

    if (mode === Mode.ADDING) {
      render(tripEventContainer[0], currentView.getElement(), renderPosition);
    } else {
      render(tripEventContainer[tripEventContainer.length - 1], currentView.getElement(), renderPosition);
      this.setDescription();
      this.setOptions();
    }

    destinationData.then((result) => this.renderDestinationList(result));

  }

  _checkPlaceholder(evt = null) {
    const placeholder = this._editForm.getElement().querySelector(`.event__label`).textContent.trim() || this._editForm.getElement().querySelector(`.event__type-toggle`).value;
    const destination = this._editForm.getElement().querySelector(`.event__input--destination`).value;

    let prep;
    if (this._data.activity.some((type) => type.toLowerCase() === placeholder)) {
      prep = ` in `;
    } else {
      prep = ` to `;
    }
    this._editForm.getElement().querySelector(`.event__label`).textContent = placeholder + prep;
    if (!evt) {
      this._tripEvent.getElement().querySelector(`.event__title`).textContent = placeholder + prep + destination;
    }
  }

  _changeForm() {
    const tripTypeList = this._editForm.getElement().querySelectorAll(`.event__type-input`);

    tripTypeList.forEach((it) => it.addEventListener(`change`, (evt) => {
      this._editForm.getElement().querySelector(`.event__type-toggle`).checked = false;
      this._editForm.getElement().querySelector(`.event__type-icon`).src = `img/icons/${evt.target.value.toLowerCase()}.png`;
      this._editForm.getElement().querySelector(`.event__label`).textContent = evt.target.value;
      this._checkPlaceholder(evt);
      this.setOptions(evt);
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

  renderDestinationList(citiesList) {
    // console.log(this._editForm.getElement());
    const destinationListContainer = this._editForm.getElement().querySelector(`.event__field-group--destination`);
    const destinationList = new DestinationList(citiesList);
    render(destinationListContainer, destinationList.getElement(), Position.BEFOREEND);
  }

  setDescription(evt = null) {
    const destinationContainer = this._editForm.getElement().querySelector(`.event__details`);
    let destination;
    if (!evt) {
      destination = {
        description: this._data.description,
        pictures: this._data.cityImages,
      };
      this.destinationDescription = new DestinationDescription(destination);
      render(destinationContainer, this.destinationDescription.getElement(), Position.BEFOREEND);
    } else {
      if (this.destinationDescription) {
        unrender(this.destinationDescription.getElement());
        this.destinationDescription.removeElement();
      }
      destinationData.then((result) => {
        destination = result.filter((it) => it.name === evt.target.value);
        this.destinationDescription = new DestinationDescription(destination[0]);
        render(destinationContainer, this.destinationDescription.getElement(), Position.BEFOREEND);
        this._data.description = destination[0].description;
        this._data.cityImages = destination[0].pictures;
      });
    }
  }

  setOptions(evt = null) {
    const offerContainer = this._editForm.getElement().querySelector(`.event__details`);
    let offersData;
    if (!evt) {
      offersData = {
        offers: this._data.options,
      };
      this.offerList = new OffersList(offersData, this.onOptionClick);
      render(offerContainer, this.offerList.getElement(), Position.AFTERBEGIN);
    } else {
      if (this.offerList) {
        unrender(this.offerList.getElement());
        this.offerList.removeElement();
      }
      offersItems.then((result) => {
        offersData = result.filter((it) => it.type === evt.target.value.toLowerCase());
        this.offerList = new OffersList({offers: offersData[0].offers});
        render(offerContainer, this.offerList.getElement(), Position.AFTERBEGIN);
        this._data.options = offersData[0].offers;
        // this._editForm.getElement().querySelectorAll(`.event__section--offers`)
        //   .addEventListener(`change`, (event) => this.onOptionClick(event));
      }
      );
    }
  }

  onOptionClick() {
    if (event.target === `INPUT`) {
      // console.log(event.target);
      // this._data.options.map((option) => );
    }
  }

  resetOptions() {
    const choosenOptions = Array.from(this._editForm.getElement().querySelectorAll(`.event__offer-checkbox`))
          .filter((it) => it.checked === true);
    // console.log(choosenOptions);

    // const tripTypeOffer = this._offersData.filter((it) => it.type === formData.get(`event-type`).toLowerCase());
    if (this._data.options) {
      this._data.options.forEach((offer) => {
        if (choosenOptions.some((it) => offer.title === it.dataset.offerName)) {
          offer.choosen = true;
        } else {
          offer.choosen = false;
        }
      });
    } else {
      return;
    }

    // console.log(this._data);
  }
}


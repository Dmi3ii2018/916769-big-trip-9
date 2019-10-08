import moment from "moment";

export class ModelEvent {
  constructor(data) {
    this.id = data[`id`];
    this.tripType = [`Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
    this.choosenTripType = data[`type`];
    this.activity = [`Check-in`, `Sightseeing`, `Restaurant`];
    this.cityImages = data[`destination`][`pictures`]; // toDo: rewrite when choosen other destination - DONE
    this.cityName = [`Moscow`, `London`, `Paris`, `Oslo`, `Berlin`, `Madrid`, `Riga`, `Rome`];
    this.cityDestination = data[`destination`][`name`];
    this.description = data[`destination`][`description`] || ``;// toDo: rewrite when choosen other destination - DONE
    this.date = {
      start: data[`date_from`],
      end: data[`date_to`],
    };
    this.price = data[`base_price`];
    this.options = data[`offers`].map((offer) => ({
      title: offer.title,
      price: offer.price,
      choosen: offer.accepted,
    }) // toDo: rewrite when choosen other destination
    );
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  static parseEvent(data) {
    return new ModelEvent(data);
  }

  static parseEvents(data) {
    return data.map(ModelEvent.parseEvent);
  }

  toRaw(newData) {
    let entry = {
      'base_price': Number(newData.get(`event-price`)),
      'date_from': Number(moment(newData.get(`event-start-time`), `DD/MM/YY HH:mm`).format(`x`)),
      'date_to': Number(moment(newData.get(`event-end-time`), `DD/MM/YY HH:mm`).format(`x`)),
      'destination': {
        'name': newData.get(`event-destination`),
        'pictures': this.cityImages, // rewrite
        'description': this.description, // rewrite
      },
      'id': this.id,
      'is_favorite': newData.get(`event-favorite`) ? true : false,
      'offers': this.options.map((it) => ({
        title: it.title,
        price: it.price,
        accepted: it.choosen,
      })),
      'type': newData.get(`event-type`) ? newData.get(`event-type`).toLowerCase() : document.querySelector(`.event__type-toggle`).value,
    };
    return entry;
  }
}

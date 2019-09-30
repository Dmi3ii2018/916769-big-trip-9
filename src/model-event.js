export class ModelEvent {
  constructor(data) {
    this.id = data[`id`];
    this.tripType = [`Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
    this.choosenTripType = data[`type`];
    this.activity = [`Check-in`, `Sightseeing`, `Restaurant`];
    this.cityImages = data[`destination`][`pictures`];
    this.cityName = [`Moscow`, `London`, `Paris`, `Oslo`, `Berlin`, `Madrid`, `Riga`, `Rome`];
    this.cityDestination = data[`destination`][`name`];
    this.description = data[`destination`][`description`] || ``;
    this.date = {
      start: data[`date_from`],
      end: data[`date_to`],
    };
    this.price = data[`base_price`];
    this.options = data[`offers`].map((offer) => ({
      name: offer.title,
      price: offer.price,
      choosen: offer.accepted,
    })
    );
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  static parseEvent(data) {
    return new ModelEvent(data);
  }

  static parseEvents(data) {
    return data.map(ModelEvent.parseEvent);
  }
}

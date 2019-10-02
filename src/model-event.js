export class ModelEvent {
  constructor(data) {
    this.id = data[`id`];
    this.tripType = [`Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
    this.choosenTripType = data[`type`];
    this.activity = [`Check-in`, `Sightseeing`, `Restaurant`];
    this.cityImages = data[`destination`][`pictures`]; // toDo: rewrite when choosen other destination
    this.cityName = [`Moscow`, `London`, `Paris`, `Oslo`, `Berlin`, `Madrid`, `Riga`, `Rome`];
    this.cityDestination = data[`destination`][`name`];
    this.description = data[`destination`][`description`] || ``;// toDo: rewrite when choosen other destination
    this.date = {
      start: data[`date_from`],
      end: data[`date_to`],
    };
    this.price = data[`base_price`];
    this.options = data[`offers`].map((offer) => ({
      name: offer.title,
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
      'base_price': newData.get(`event-price`),
      'date_from': newData.get(`event-start-time`),
      'date_to': newData.get(`event-end-time`),
      'destination': {
        'name': newData.get(`event-destination`),
        'pictures': this.cityImages, // rewrite
        'description': this.description, // rewrite
      },
      'id': this.id,
      'is_favorite': this.isFavorite,
      'offers': this.options, // rewrite
      'type': newData.get(`event-type`) || document.querySelector(`.event__type-toggle`).value,
    };
    return entry;
  }
}

// base_price: 1100
// date_from: 1569835782725
// date_to: 1569906382831
// destination:
// description: "Sochi, is a beautiful city, a true asian pearl."
// name: "Sochi"
// pictures: Array(5)
// 0: {src: "http://picsum.photos/300/200?r=0.3950751456306174", description: "Sochi kindergarten"}
// 1: {src: "http://picsum.photos/300/200?r=0.32824048895659863", description: "Sochi kindergarten"}
// 2: {src: "http://picsum.photos/300/200?r=0.5917147241124179", description: "Sochi central station"}
// 3: {src: "http://picsum.photos/300/200?r=0.7864115737961972", description: "Sochi embankment"}
// 4: {src: "http://picsum.photos/300/200?r=0.056077762567536826", description: "Sochi embankment"}
// length: 5
// __proto__: Array(0)
// __proto__: Object
// id: "0"
// is_favorite: false
// offers: Array(1)
// 0: {title: "Choose VIP area", price: 30, accepted: false}
// length: 1
// __proto__: Array(0)
// type: "restaurant"


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

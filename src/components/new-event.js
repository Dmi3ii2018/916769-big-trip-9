// import AbstractComponent from "./abstract-component.js";

// export default class NewEvent extends AbstractComponent {
//   constructor({tripType, tripTypeImage, cityName, cityImages, description, date}) {
//     super();
//     this._tripType = tripType;
//     this._tripTypeImage = tripTypeImage;
//     this._cityName = cityName;
//     this._cityImages = cityImages;
//     this._description = description;
//     this._date = date;
//   }

//   getTemplate() {
//     return `<form class="trip-events__item  event  event--edit" action="#" method="post">
//     <header class="event__header">
//       <div class="event__type-wrapper">
//         <label class="event__type  event__type-btn" for="event-type-toggle-1">
//           <span class="visually-hidden">Choose event type</span>
//           <img class="event__type-icon" width="17" height="17" src=${this._tripTypeImage} alt="Event type icon">
//         </label>
//         <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

//         <div class="event__type-list">
//           <fieldset class="event__type-group">
//             <legend class="visually-hidden">Transfer</legend>

//             <div class="event__type-item">
//               <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
//               <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">${this._tripType[Math.floor(Math.random() * 7)]}</label>
//             </div>

//             <div class="event__type-item">
//               <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
//               <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">${this._tripType[Math.floor(Math.random() * 7)]}</label>
//             </div>

//             <div class="event__type-item">
//               <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
//               <label class="event__type-label  event__type-label--train" for="event-type-train-1">${this._tripType[Math.floor(Math.random() * 7)]}</label>
//             </div>

//             <div class="event__type-item">
//               <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
//               <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">${this._tripType[Math.floor(Math.random() * 7)]}</label>
//             </div>

//             <div class="event__type-item">
//               <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
//               <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">${this._tripType[Math.floor(Math.random() * 7)]}</label>
//             </div>

//             <div class="event__type-item">
//               <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
//               <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">${this._tripType[Math.floor(Math.random() * 7)]}</label>
//             </div>

//             <div class="event__type-item">
//               <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
//               <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">${this._tripType[Math.floor(Math.random() * 7)]}</label>
//             </div>
//           </fieldset>

//           <fieldset class="event__type-group">
//             <legend class="visually-hidden">Activity</legend>

//             <div class="event__type-item">
//               <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
//             <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">${this._tripType[Math.floor(Math.random() * 6)]}</label>
//             </div>

//             <div class="event__type-item">
//               <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
//               <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">${this._tripType[Math.floor(Math.random() * 6)]}</label>
//             </div>

//             <div class="event__type-item">
//               <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
//               <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">${this._tripType[Math.floor(Math.random() * 6)]}</label>
//             </div>
//           </fieldset>
//         </div>
//       </div>

//       <div class="event__field-group  event__field-group--destination">
//         <label class="event__label  event__type-output" for="event-destination-1">
//           Sightseeing at
//         </label>
//         <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
//         <datalist id="destination-list-1">
//           ${this._cityName.map((city) => `<option value=${city}></option>`).join(``)}
//         </datalist>
//       </div>

//       <div class="event__field-group  event__field-group--time">
//         <label class="visually-hidden" for="event-start-time-1">
//           From
//         </label>
//         <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${new Date(this._date.start).toDateString()}>
//         &mdash;
//         <label class="visually-hidden" for="event-end-time-1">
//           To
//         </label>
//         <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${new Date(this._date.end).toDateString()}>
//       </div>

//         <div class="event__field-group  event__field-group--price">
//           <label class="event__label" for="event-price-1">
//             <span class="visually-hidden">Price</span>
//             €
//           </label>
//           <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
//         </div>

//         <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
//         <button class="event__reset-btn" type="reset">Cancel</button>
//       </header>
//     </form>`;
//   }
// }

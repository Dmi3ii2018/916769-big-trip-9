import AbstractComponent from "./abstract-component";

export default class DestinationList extends AbstractComponent {
  constructor(data) {
    super();
    this.destinationList = data.map((destination) => destination.name);
  }

  getTemplate() {
    return `<datalist id="destination-list-1">
    ${this.destinationList.map((city) => `<option value=${city}></option>`).join(``)}
  </datalist>`;
  }
}

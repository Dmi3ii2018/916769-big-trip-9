export const createMenuTemplate = ({menuItem, active}) => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  ${active}" href="#">${menuItem[Math.round(Math.random())]}</a>
      <a class="trip-tabs__btn ${active}" href="#">${menuItem[Math.round(Math.random())]}</a>
    </nav>
  `;
};

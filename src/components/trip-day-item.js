
export const createTripDayTemplate = ({date}) => {
  return `
    <ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">1</span>
          <time class="day__date" datetime=${new Date(date.start).toDateString()}>${new Date(date.start).toDateString()}</time>
        </div>
        <ul class="trip-events__list">

        </ul>
      </li>
    <ul>
  `;
};

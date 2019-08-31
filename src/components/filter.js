export const createFilterTemplate = ({filterItem, checked}) => {
  return `
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">

      <div class="trip-filters__filter">
        <input id="filter-everything" ${checked ? `checked` : ``} class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">${filterItem[Math.floor(Math.random() * 3)]}</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" ${checked ? `checked` : ``} class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">${filterItem[Math.floor(Math.random() * 3)]}</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" ${checked ? `checked` : ``} class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
        <label class="trip-filters__filter-label" for="filter-past">${filterItem[Math.floor(Math.random() * 3)]}</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

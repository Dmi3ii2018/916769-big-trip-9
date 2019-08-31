export const createTripinfoTemplate = ({cities, dateStart, dateEnd, cost}) => {
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${cities}</h1>

        <p class="trip-info__dates">${new Date(dateStart).toDateString()}&nbsp;—&nbsp;${new Date(dateEnd).toDateString()}</p>
      </div>

      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>
  `;
};



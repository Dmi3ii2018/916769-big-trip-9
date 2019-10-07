import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {eventsList} from "../src/main.js";

const getLabelList = (eventsData) => {
  let choosenTrip = eventsData.map((it) => it.choosenTripType);

  return Array.from(new Set(choosenTrip));
};

const createMoneyData = (eventsData) => {
  let labelSet = getLabelList(eventsData);

  let arr = [];
  labelSet.forEach((it) => {
    arr.push(eventsData.filter((event) => event.choosenTripType === it).map((val) => val.price));
  });
  let priceArr = [];
  arr.forEach((item) => {
    priceArr.push(item.reduce((acc, cur) => acc + cur, 0));
  });
  return priceArr;
};

const createTransportData = (eventsData) => {
  let labelSet = getLabelList(eventsData);
  let transportSet = [];
  labelSet.forEach((item) => {
    transportSet.push(eventsData.filter((it) => it.choosenTripType === item).length);
  });
  return Array.from(transportSet);
};

const createTimeSpentData = (eventsData) => {
  let labelSet = getLabelList(eventsData);
  let arr = [];
  labelSet.forEach((it) => {
    arr.push(eventsData.filter((event) => event.choosenTripType === it)
    .reduce((acc, val) => acc + (val.date.end - val.date.start), 0));
  });
  return arr.map((it) => Math.round(it / 1000 / 60 / 60));
};

const moneyChart = (moneyCtx, data) => new Chart(moneyCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: getLabelList(data),
    datasets: [{
      label: ``,
      data: createMoneyData(data),
      backgroundColor: `rgba(255, 255, 255, 1)`,
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      datalabels: {
        anchor: `end`,
        align: `left`,
        font: {
          size: 14
        },
        color: `#000000`,
        labels: {
          title: {

          }
        }
      }
    },
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: `MONEY`,
      position: `left`,
      fontSize: 26,
      fontColor: `#000000`
    },
    layout: {
      padding: {
        top: 10,
      }
    },
    scales: {
      yAxes: [{
        barThickness: 40,
        maxBarThickness: 50,
        ticks: {
          callback(value) {
            return value.toUpperCase();
          },
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
      xAxes: [{
        minBarLength: 50,
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    }
  }
});

const transportChart = (transprotCtx, data) => new Chart(transprotCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: getLabelList(data),
    datasets: [{
      label: ``,
      data: createTransportData(data),
      backgroundColor: `rgba(255, 255, 255, 1)`,
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      datalabels: {
        anchor: `end`,
        align: `left`,
        font: {
          size: 14
        },
        color: `#000000`,
        labels: {
          title: {

          }
        }
      }
    },
    legend: {
      display: false,
    },
    layout: {
      padding: {
        top: 10,
      }
    },
    title: {
      display: true,
      text: `TRANSPORT`,
      position: `left`,
      fontSize: 26,
      fontColor: `#000000`
    },
    scales: {
      offset: true,
      yAxes: [{
        barThickness: 40,
        maxBarThickness: 50,
        ticks: {
          callback(value) {
            return value.toUpperCase();
          },
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
      xAxes: [{
        minBarLength: 50,
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
    }
  }
});

const timeSpentChart = (transprotCtx, data) => new Chart(transprotCtx, {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: getLabelList(data),
    datasets: [{
      label: ``,
      data: createTimeSpentData(data),
      backgroundColor: `rgba(255, 255, 255, 1)`,
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      datalabels: {
        anchor: `end`,
        align: `left`,
        font: {
          size: 14
        },
        color: `#000000`,
        labels: {
          title: {

          }
        }
      }
    },
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: `TIME SPENT`,
      position: `left`,
      fontSize: 26,
      fontColor: `#000000`
    },
    scales: {

      yAxes: [{
        minBarLength: 50,
        barThickness: 40,
        maxBarThickness: 50,
        ticks: {
          callback(value) {
            return value.toUpperCase();
          },
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
      xAxes: [{
        layout: {
          padding: {
            top: 0,
          }
        },
        minBarLength: 50,
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
    }
  }
});

export const getStatistics = (moneyCtx, transportCtx, timeSpentCtx) => {
  eventsList.then((result) => {
    moneyChart(moneyCtx, result);
    transportChart(transportCtx, result);
    timeSpentChart(timeSpentCtx, result);
  });
};

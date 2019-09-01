export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;
  return container.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN: {
      container.prepend(element);
      break;
    }
    case Position.BEFOREEND: {
      container.append(element);
      break;
    }
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

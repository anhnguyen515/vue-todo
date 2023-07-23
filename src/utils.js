export function debounce(fn, delayMs = 500) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    const context = this; // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args); // call the function if time expires
    }, delayMs);
  };
}

export function saveToLocalStorage(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

export function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

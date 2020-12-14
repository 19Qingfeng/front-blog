export const debounce = (fn, delay) => {
  let timer = null
  return function() {
    if(timer) clearTimeout(timer)
    const args = arguments;
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export const getLocalStroage = (key) => {
  try {
      return JSON.parse(window.localStorage.getItem(key))
  } catch {
  // nothing
  }
  return window.localStorage.getItem(key)
  // return JSON.stringify(window.localStorage.getItem(key))
}

export const setLocalStroage = (key, value) => {
  if (value && typeof value === 'object') {
      value = JSON.stringify(value)
  }
  return window.localStorage.setItem(key, value)
}

export const removeLocalStroage = (key) => {
  return window.localStorage.removeItem(key)
}

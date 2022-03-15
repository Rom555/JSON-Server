import { renderError } from './render';

export const debounce = (func, ms = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
};

export const getData = (url) => {
  return fetch(url)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((error) => {
      renderError();
      throw error;
    });
};

export const sendData = (url, data) => {
  return fetch(url, {
    method: data.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data.body ? JSON.stringify(data.body) : '',
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(`${res.status} ${res.statusText}`);
    })
    .catch((error) => {
      renderError();
      // throw error;
    });
};

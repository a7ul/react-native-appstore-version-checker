export const parseJson = (r) => new Promise((resolve, reject) => {
  r.json().then((result) => {
    r.data = result;
    resolve(r);
  }).catch((err) => {
    r.data = err;
    reject(r);
  });
});

export const get = (url) => {
  const config = {
    method: 'GET',
    credentials: 'include',
    mode: 'no-cors'
  };
  return fetch(url, config).then((response) => {
    if (response.status === 200) {
      return response;
    }
    throw response;
  });
};

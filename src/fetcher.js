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
    mode: 'no-cors',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': 0
    }
  };
  return fetch(url, config).then((response) => {
    if (response.status === 200) {
      return response;
    }
    throw response;
  });
};

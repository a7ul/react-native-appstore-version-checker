export const parseJson = (r) => new Promise((resolve, reject) => {
  r.json().then((result) => {
    r.data = result;
    resolve(r);
  }).catch((err) => {
    r.data = err;
    reject(r);
  });
});

export const parseHTML = (r) => new Promise((resolve, reject) => {
  r.blob().then((d) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(d);
  }).catch((err) => reject(err));
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

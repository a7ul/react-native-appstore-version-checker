import result from 'lodash/result';
import {get, parseJson} from './fetcher';

const getAppstoreAppVersion = (identifier, { typeOfId = 'id', country = 'us' }) => {
  const url = `https://itunes.apple.com/lookup?${typeOfId}=${identifier}&country=${country}`;
  return get(url).then(parseJson).then((d) => {
    const version = result(d, 'data.results[0].version');
    if (!version) {
      throw new Error('App not found!');
    }
    return version;
  });
};

module.exports = {
  getAppstoreAppVersion
};

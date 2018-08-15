import _result from 'lodash.result';
import {get, parseJson} from './fetcher';

const getAppstoreAppVersion = (identifier, options = { typeOfId: 'id', country: 'us' }) => {
  const country = options.country ? `&country=${options.country}` : '';
  const url = `https://itunes.apple.com/lookup?${options.typeOfId}=${identifier}${country}`;
  return get(url).then(parseJson).then((d) => {
    const version = _result(d, 'data.results[0].version');
    if (!version) {
      throw new Error('App not found!');
    }
    return version;
  });
};

module.exports = {
  getAppstoreAppVersion
};

import result from 'lodash/result';
import {get, parseJson} from './fetcher';

const getAppstoreAppVersion = (identifier, appIdorBundleId = 'id') => {
  const url = `http://itunes.apple.com/lookup?${appIdorBundleId}=${identifier}`;
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

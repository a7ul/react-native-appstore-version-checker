import result from 'lodash/result';
import {get, parseJson} from './fetcher';

const getAppVersion = (id) => {
  const url = 'http://itunes.apple.com/lookup?bundleId=';
  return get(url + id).then(parseJson).
  then((d) => {
    const version = result(d, 'data.results[0].version');
    if (!version) {
      throw new Error('App not found!');
    }
    return version;
  });
};

module.exports = {
  getAppVersion
};

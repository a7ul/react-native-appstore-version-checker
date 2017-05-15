import {NativeModules} from 'react-native';
import {get} from './fetcher';

const getAppstoreAppVersion = (id, jquerySelector = '[itemprop=\'softwareVersion\']') => {
  const url = `https://play.google.com/store/apps/details?id=${id}`;
  return new Promise((resolve, reject) => {
    NativeModules.RNAppstoreVersionChecker.appVersionExtractor(url,jquerySelector,resolve, reject);
  });
};

module.exports = {
  getAppstoreAppVersion
};

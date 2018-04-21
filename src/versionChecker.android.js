import {NativeModules} from 'react-native';
import {get} from './fetcher';
const getAppstoreAppVersion = (id, options = { jquerySelector: "" }) => {

  const url = `https://play.google.com/store/apps/details?id=${id}`;
  return new Promise((resolve, reject) => {
    NativeModules.RNAppstoreVersionChecker.appVersionExtractor(url,options.jquerySelector,resolve, reject);
  });
};

module.exports = {
  getAppstoreAppVersion
};

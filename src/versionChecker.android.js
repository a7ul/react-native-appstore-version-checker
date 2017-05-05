//
import {NativeModules} from 'react-native';
import {get, parseHTML} from './fetcher';

// $('[itemprop=\'softwareVersion\']').text().trim();

const getAppVersion = (id) => {
  const url = `https://play.google.com/store/apps/details?id=${id}&hl=in`;
  console.log('calling');
  return new Promise((resolve, reject) => {
    NativeModules.RNAppstoreVersionChecker.appVersionExtractor(url, resolve, reject);
  });
  // return get(url).then(parseHTML).then((d) => {
  //   console.log(d);
  //   return  $('[itemprop=\'softwareVersion\']').text().trim();
  // });
};

module.exports = {
  getAppVersion
};

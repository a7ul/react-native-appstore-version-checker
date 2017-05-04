//
import { NativeModules } from 'react-native';
NativeModules.RNAppstoreVersionChecker.getAppVersion(()=>console.log(),(d)=>console.log(d));
// export default RNAppstoreAppVersionCheck;

import {get, parseHTML} from './fetcher';
// $('[itemprop=\'softwareVersion\']').text().trim();

const getAppVersion = (id) => {
  const url = `https://play.google.com/store/apps/details?id=${id}&hl=in`;
  return Promise.resolve(url);
  // return get(url).then(parseHTML).then((d) => {
  //   console.log(d);
  //   return  $('[itemprop=\'softwareVersion\']').text().trim();
  // });
};

module.exports = {
  getAppVersion
};

import {NativeModules} from 'react-native';

const extractMetadata = (url, jquerySelectors) => new Promise((resolve, reject) => {
  NativeModules.RNAppstoreVersionChecker.extractMetadata(
    url,
    jquerySelectors,
    resolve,
    reject,
  );
});

const getAppstoreAppMetadata = async (id, options = { jquerySelectors: {} }) => {
  const language = options.language ? `&hl=${options.language}` : 'en';
  const url = `https://play.google.com/store/apps/details?id=${id}&${language}`;
  const { version, currentVersionReleaseDate } = await extractMetadata(url, options.jquerySelectors);
  return {
    version,
    currentVersionReleaseDate: new Date(currentVersionReleaseDate),
  };
}

const getAppstoreAppVersion = async (id, options = { jquerySelector: "" }) => {
  const newOptions = {
    jquerySelectors: { version: options.jquerySelector },
    ...options,
  };
  const metadata = await getAppstoreAppMetadata(id, newOptions);
  return metadata.version;
};

module.exports = {
  getAppstoreAppVersion,
  getAppstoreAppMetadata,
};

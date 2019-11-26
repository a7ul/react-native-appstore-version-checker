import _result from 'lodash.result';
import {get, parseJson} from './fetcher';

const getAppstoreAppMetadata = async (identifier, options = { typeOfId: 'id' }) => {
  const country = options.country ? `&country=${options.country}` : '';
  const url = `https://itunes.apple.com/lookup?${options.typeOfId}=${identifier}${country}`;
  const jsonData = await get(url);
  const response = await parseJson(jsonData);

  if (!response || !response.data || response.data.resultCount === 0 || response.data.results.length === 0) {
    throw new Error('App not found!');
  }
  const version = _result(response, 'data.results[0].version');
  const currentVersionReleaseDate = _result(response, 'data.results[0].currentVersionReleaseDate');
  return {
    version,
    currentVersionReleaseDate: new Date(currentVersionReleaseDate),
  }
};

const getAppstoreAppVersion = async (identifier, options) => {
  const metadata = await getAppstoreAppMetadata(identifier, options);
  return metadata.version;
};

module.exports = {
  getAppstoreAppVersion,
  getAppstoreAppMetadata,
};

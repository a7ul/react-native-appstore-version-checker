
# react-native-appstore-version-checker

## Getting started

`npm install react-native-appstore-version-checker --save`

or

`yarn add react-native-appstore-version-checker`

### Automatic installation

`react-native link react-native-appstore-version-checker`

### Manual installation


#### iOS

Nothing to be done here ( its pure JS for IOS ;) )

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNAppstoreVersionCheckerPackage;` to the imports at the top of the file
  - Add `new RNAppstoreVersionCheckerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-appstore-version-checker'
  	project(':react-native-appstore-version-checker').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-appstore-version-checker/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-appstore-version-checker')
  	```


## Usage
```javascript
import {getAppstoreAppVersion} from 'react-native-appstore-version-checker';

or

var getAppstoreAppVersion = require('react-native-appstore-version-checker').getAppstoreAppVersion;

getAppstoreAppVersion('com.whatsapp') //put any apps identifier here
.then((appVersion) => {
  console.log('Whatsapp version on store', appVersion);
})
.catch((err) => {
  console.log('error occurred', err);
});
```

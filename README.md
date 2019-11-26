# react-native-appstore-version-checker ![npm](https://img.shields.io/npm/dm/react-native-appstore-version-checker.svg)

[![https://nodei.co/npm/react-native-appstore-version-checker.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/react-native-appstore-version-checker.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-native-appstore-version-checker)

A react native module to check an app's version on playstore or ios app store.
This module can be used to check if your app has a new version on playstore or apple app store.
or you can even check what is the latest version of another app on playstore.

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

- Add `import com.masteratul.RNAppstoreVersionCheckerPackage;` to the imports at the top of the file
- Add `new RNAppstoreVersionCheckerPackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:

```
   include ':react-native-appstore-version-checker'
   project(':react-native-appstore-version-checker').projectDir = new File(rootProject.projectDir,     '../node_modules/react-native-appstore-version-checker/android')
```

3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

```
   compile project(':react-native-appstore-version-checker')
```

## Usage

```javascript
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";

or;

var getAppstoreAppMetadata = require("react-native-appstore-version-checker")
  .getAppstoreAppMetadata;

//On Android u can do
getAppstoreAppMetadata("com.supercell.clashofclans") //put any apps packageId here
  .then(metadata => {
    console.log(
      "clashofclans android app version on playstore",
      metadata.version,
      "published on",
      metadata.currentVersionReleaseDate
    );
  })
  .catch(err => {
    console.log("error occurred", err);
  });

//On IOS u can do
getAppstoreAppMetadata("529479190") //put any apps id here
  .then(appVersion => {
    console.log(
      "clashofclans android app version on appstore",
      metadata.version,
      "published on",
      metadata.currentVersionReleaseDate
    );
  })
  .catch(err => {
    console.log("error occurred", err);
  });
```

### How To find an appid in IOS or packageId in Android

#### IOS

**Finding appid for an ios app**

Search for an app on itunes store. Lets take the example of `clash of clans`.

<br>

<div style="text-align:center">
  <img src="https://github.com/master-atul/react-native-appstore-version-checker/raw/master/screenshots/ios-example-screenshot.jpg" style="width: 50%;display: inline;">
</div>
<br>

The area marked on red is the app's `appid`

#### ANDROID

**Finding packageId for an android app**

Search for an app on playstore. Lets take the example of `clash of clans`.

<br>

<div style="text-align:center">
  <img src="https://github.com/master-atul/react-native-appstore-version-checker/raw/master/screenshots/android-example-screenshot.jpg" style="width: 50%;display: inline;">
</div>
<br>

The area marked on red is the app's `packageId`

### Advanced Options

```javascript
getAppstoreAppMetadata(identifier, options);
```

**params:**

- `identifier` is the app package id like `com.example.app`

- `options` contains values which can affect the result obtained from the store

      - `jquerySelectors` [Android] object with metadata property names to dom dom element identifiers (much like jquery selector) for playstore app page. Currently to get the appversion from the page we do load `https://play.google.com/store/apps/details?id=<app package id>` and parse `$('body > [itemprop="softwareVersion"]')` but you can optionally pass in a custom selector if you want. This is useful if dom structure of the app store page changes in the future.

      - `typeOfId` [iOS] (default is `id`) It can be either `id` or `bundleId`. If the `typeOfId` is `id` you need to pass `identifier` as appid and if `typeOfId` is `bundleId` you need to pass bundleIdentifier to `identifier`. It is basically, the query parameter for `https://itunes.apple.com/lookup?${typeOfId}=${identifier}`.

  Currently to get the ios version number from app store we hit the url `https://itunes.apple.com/lookup?id=<app id>` by default.
  or we can also hit
  `https://itunes.apple.com/lookup?bundleId=<app bundle id>` if we pass typeOfId as `bundleId`.
  When we hit the above said urls we get json with all the info of the app.

      - `country` [iOS] (default is `us`) The two-letter country code for the store you want to search. The search uses the default store front for the specified country.

```javascript
const storeSpecificId =
  Platform.OS === "ios" ? "529479190" : "com.supercell.clashofclans";

getAppstoreAppMetadata(storeSpecificId, {
  jquerySelectors: {
    version: "[itemprop='softwareVersion']"
  },
  typeOfId: "id",
  country: "de"
});
```

```javascript
getAppstoreAppVersion(identifier, options);
```

`getAppstoreAppVersion` has been maintained with previous versions for backwards compatibility. The only difference is that instead
of `jquerySelectors`, the `options` objet only takes one selector for the app version and it's called `jquerySelector`.

**Example**

```javascript
const storeSpecificId =
  Platform.OS === "ios" ? "529479190" : "com.supercell.clashofclans";

getAppstoreAppVersion(storeSpecificId, {
  jquerySelector: "[itemprop='softwareVersion']",
  typeOfId: "id",
  country: "de"
});
```

Quick note: it will get the public version from stores, that is, will not get alfa, beta or internal versions.

### Contributors

- [Atul R](https://github.com/master-atul)
- [Dmytro Gorelik](https://github.com/dhorelik)
- [Oleg Filimonov](https://github.com/olegfilimonov)
- [Carlos](https://github.com/carl0395)
- [EricH](https://github.com/jehartzog)
- [Regan Langford](https://github.com/ReganL)
- [Yuttana K](https://github.com/Thunderbird7)
- [Luís](https://github.com/luissmg)
- [Grover TB](https://github.com/grovertb)
- [David Saltares](https://github.com/dsaltares)

### License

MIT

© Atul R

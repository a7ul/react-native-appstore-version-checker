
# react-native-appstore-version-checker

## Getting started

`$ npm install react-native-appstore-version-checker --save`

### Mostly automatic installation

`$ react-native link react-native-appstore-version-checker`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-appstore-version-checker` and add `RNAppstoreVersionChecker.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAppstoreVersionChecker.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

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

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNAppstoreVersionChecker.sln` in `node_modules/react-native-appstore-version-checker/windows/RNAppstoreVersionChecker.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Com.Reactlibrary.RNAppstoreVersionChecker;` to the usings at the top of the file
  - Add `new RNAppstoreVersionCheckerPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNAppstoreVersionChecker from 'react-native-appstore-version-checker';

// TODO: What to do with the module?
RNAppstoreVersionChecker;
```
  
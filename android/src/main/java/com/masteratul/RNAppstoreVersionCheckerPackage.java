
package com.masteratul;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
public class RNAppstoreVersionCheckerPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
      return Arrays.<NativeModule>asList(new RNAppstoreVersionCheckerModule(reactContext));
    }

    //leaving it to support react-native v0.47 and less
    public List<Class<? extends JavaScriptModule>> createJSModules() {
      return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      return Collections.emptyList();
    }
}

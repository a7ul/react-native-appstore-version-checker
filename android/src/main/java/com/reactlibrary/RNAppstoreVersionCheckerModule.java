
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNAppstoreVersionCheckerModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNAppstoreVersionCheckerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNAppstoreVersionChecker";
  }

  @ReactMethod
  public void getAppVersion(
          Callback errorCallback,
          Callback successCallback) {
    try {
        WebView view = new WebView(reactContext);
        successCallback.invoke(view);
    } catch (Exception e) {
      errorCallback.invoke(e.getMessage());
    }
  }
}
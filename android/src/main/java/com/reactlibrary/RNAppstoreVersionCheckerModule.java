
package com.reactlibrary;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class RNAppstoreVersionCheckerModule extends ReactContextBaseJavaModule {

    public RNAppstoreVersionCheckerModule(ReactApplicationContext rContext) {
        super(rContext);
    }

    @Override
    public String getName() {
        return "RNAppstoreVersionChecker";
    }

    @ReactMethod
    public void appVersionExtractor(
            String url, String extractor,
            Callback successCallback,
            Callback errorCallback) {
        try {
            Document doc = Jsoup.connect(url).get();
            Elements versionElement = doc.select(extractor);
            String versionText = versionElement.text();
            successCallback.invoke(versionText);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }

    }
}
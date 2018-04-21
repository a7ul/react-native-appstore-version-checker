
package com.masteratul;

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
            String versionText;
            if(extractor.equalsIgnoreCase("")){
                versionText = doc.getElementsContainingOwnText("Current Version").parents().first().getAllElements().last().text();
            }else{
              versionText = doc.select(extractor).text();
            }
            // https://stackoverflow.com/a/49924787/2881112
            successCallback.invoke(versionText);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }

    }
}

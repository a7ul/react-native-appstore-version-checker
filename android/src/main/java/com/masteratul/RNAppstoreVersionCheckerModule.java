
package com.masteratul;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

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
    public void extractMetadata(
            String url, ReadableMap extractors,
            Callback successCallback,
            Callback errorCallback) {
        try {
            Document doc = Jsoup.connect(url).get();
            WritableMap metadata = Arguments.createMap();

            metadata.putString(
                "version",
                extractField(doc, "Current Version", "version", extractors)
            );
            metadata.putString(
                "currentVersionReleaseDate",
                extractField(doc, "Updated", "currentVersionReleaseDate", extractors)
            );

            // https://stackoverflow.com/a/49924787/2881112
            successCallback.invoke(metadata);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }

    }

    private String extractField(
            Document doc,
            String fieldLabel,
            String extractorName,
            ReadableMap extractors) {
        if(extractors.hasKey(extractorName)) {
            return doc.select(extractors.getString(extractorName)).text();
        }

        return doc.getElementsContainingOwnText(fieldLabel).parents().first().getAllElements().last().text();
    }
}

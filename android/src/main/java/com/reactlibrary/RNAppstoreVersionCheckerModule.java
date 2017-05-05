
package com.reactlibrary;

import android.annotation.TargetApi;
import android.net.http.SslError;
import android.os.Build;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNAppstoreVersionCheckerModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    public RNAppstoreVersionCheckerModule(ReactApplicationContext rContext) {
        super(rContext);
        reactContext = rContext;

    }

    @Override
    public String getName() {
        return "RNAppstoreVersionChecker";
    }

    @ReactMethod
    public void appVersionExtractor(
            String url,
            final Callback errorCallback,
            final Callback successCallback) {
        try {
            WebView webView = new WebView(reactContext);
            WebSettings webSettings = webView.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webView.loadUrl(url);
            webView.setWebViewClient(new WebViewClient() {
                @Override
                public void onPageFinished(WebView view, String url) {
                    successCallback.invoke(url);
                }

                @TargetApi(Build.VERSION_CODES.M)
                @Override
                public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                    errorCallback.invoke(error.getDescription());
                }

                @TargetApi(Build.VERSION_CODES.LOLLIPOP)
                @Override
                public void onReceivedHttpError(
                        WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
                    errorCallback.invoke(errorResponse.getReasonPhrase());

                }

                @Override
                public void onReceivedSslError(WebView view, SslErrorHandler handler,
                                               SslError error) {
                    errorCallback.invoke(error.toString());
                }
            });

        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
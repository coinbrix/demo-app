# Getting Started with GamePay Web SDK
This is a demo web-app to use gamepay web-sdk.

# Integration steps
1. Add the following self-calling function snippet and supporting snippet in your root-html
```
    <link href="https://gamepay-ui-js-2.s3.ap-south-1.amazonaws.com/main.css" rel="stylesheet">
    <script>
      (function (w, d, s, o, f, js, fjs) {
        w[o] =
          w[o] ||
          function () {
            (w[o].q = w[o].q || []).push(arguments);
          };
        (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
        js.id = o;
        js.src = f;
        js.async = 1;
        fjs.parentNode.insertBefore(js, fjs);
      })(window, document, "script", "__gamePay", "https://gamepay-ui-js-2.s3.ap-south-1.amazonaws.com/main.js");
      __gamePay("init");
    </script>
```
Visit https://github.com/coinbrix/demo-app/blob/master/public/index.html

2. Create a CTA in your web-app to open GamePay drawer. The CTA should call __gamepay object

```
function openDrawer(){
  window.__gamePay("event","open");
}
```
Visit https://github.com/coinbrix/demo-app/blob/master/src/App.js



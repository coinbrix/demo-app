# Getting Started with GamePay Web SDK
This is a demo web-app to use Singularity web-sdk.

# Integration steps
1. Add the following self-calling function snippet and supporting snippet in your root-html
```
    <link href="https://unpkg.com/game-pay-web-sdk@latest/main.css" rel="stylesheet">
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
      })(window, document, "script", "__gamePay", "https://unpkg.com/game-pay-web-sdk@latest/main.js");
      __gamePay("init", { GAMEPAY_API_KEY: 2 });
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

```
function getUserInfo(){
__gamePay("event","getConnectUserInfo",(data) => { console.log(data) })}
```
3. User can hit the "x" button inside the drawer to close it or can call window.__gamePay("event","close");

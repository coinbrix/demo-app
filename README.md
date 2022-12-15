# Getting Started with Singularity Web SDK
This is a demo web-app to use Singularity web-sdk.

# Integration steps
1. Add the following self-calling function snippet and supporting snippet in your root-html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.
      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>Gamepay Web SDK Wrapper</title>
    <link href="https://cdn.jsdelivr.net/npm/game-pay-web-sdk@1.9.0-sandbox.9/main.css" rel="stylesheet">
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
      })(window, document, "script", "Singularity", "https://cdn.jsdelivr.net/npm/game-pay-web-sdk@1.9.0-sandbox.9/main.js");
      Singularity('init', {
        GAMEPAY_API_KEY: 2
      });
            window.addEventListener('DOMContentLoaded', function () {
        /** For real time events subscribe below methods - START **/
        // 1. subscribe for walletDetails info.
        //    triggers both in case of login/logut action
        const handleWalletInfo = (event) => {
          const walletDetails = event.detail.callback();
          console.log('Wallet details', walletDetails);
        };
        SingularityEvent.subscribe('walletInfo', handleWalletInfo);

        // 2. subscribe for open drawer event
        const handleDrawerOpen = () => {
          console.log('Drawer Open');
        };
        SingularityEvent.subscribe('drawerOpen', handleDrawerOpen);
        // 3. subscribe for close drawer event
        const handleDrawerClose = () => {
          console.log('Drawer close');
        };
        SingularityEvent.subscribe('drawerClose', handleDrawerClose);

        // NOTE: unsubscribe drawer close event
        // SingularityEvent.unsubscribe('drawerClose', handleDrawerClose);
      });
      /** For real time events subscribe below methods - END **/
      window.onload = function() {
        console.log("opening Singularity-drawer")
        window.SingularityEvent.open();
      };
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.
      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.
      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

# Singularity-Webview

## There are two ways of communication between client and Singualarity SDK

### 1. Subscription based
  * walletInfo
  * drawerOpen
  * drawerClose

```Javascript
   const handleWalletInfo = (event) => {
            const walletDetails = event.detail.callback();
            console.log('Wallet details', walletDetails);
          };
   window.SingularityEvent.subscribe('walletInfo', handleWalletInfo);
```

```Javascript
const handleDrawerOpen = () => {
          console.log('Drawer open');
        };
window.SingularityEvent.subscribe('drawerOpen', handleDrawerOpen);
```

```Javascript
const handleDrawerClose = () => {
          console.log('Drawer close');
        };
window.SingularityEvent.subscribe('drawerClose', handleDrawerClose);
```

### 2. Function based
  * close
  * open
  * getConnectUserInfo
  * transactionFlow
  * requestPersonalSignature
  * requestTypedSignature
  
```Javascript
window.SingularityEvent.close();
```

```Javascript
window.SingularityEvent.open();
```

```Javascript
const data = await window.SingularityEvent.getConnectUserInfo();
```
  
```Javascript
const signature = await window.SingularityEvent.requestPersonalSignature("hello world")
```

```Javascript
 const domain = {
    name: 'GamePay',
    version: '1',
    chainId: 97,
    verifyingContract: '0xED975dB5192aB41713f0080E7306E08188e53E7f'
  };

  const types = {
    bid: [
      { name: 'bidder', type: 'address' },
      { name: 'collectableId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'nounce', type: 'uint' }
    ]
  };

  const values = {
    bidder: '0xAa81f641d4b3546F05260F49DEc69Eb0314c47De',
    collectableId: 1,
    amount: 100,
    nounce: 1
  };
const signature = await window.SingularityEvent.requestTypedSignature(domain, types, values)
```

```Javascript
window.SingularityEvent.transactionFlow({name:'TRANSACTION_FLOW',data: {
  "transactionId": "8ec6af37-c22d-42db-b062-93762b654091",
  "clientReferenceId": "5",
  "singularityTransactionStatus": "SINGULARITY_TRANSACTION_INITIATED",
  "singularityTransactionDetails": {
    "transactionId": "8ec6af37-c22d-42db-b062-93762b654091",
    "clientReferenceId": "5",
    "clientId": "57de55a2-c0a7-420d-97a7-1d907c61ba71",
    "userId": "55c022d3-f819-40b8-9086-7807b4f66bdd",
    "clientRequestedAsset": {
      "assetId": "33",
      "chainId": "POLYGON",
      "chainCategory": "EVM",
      "currencyType": "MATIC"
    },
    "paymentOptions": {
      "crypto": [
        {
          "assetId": "33",
          "chainId": "POLYGON",
          "chainCategory": "EVM",
          "currencyType": "MATIC",
          "decimal": "18",
          "currencyIcon": "imageUrl",
          "collectCurrencyAmount": "0.3",
          "collectGasInformation": {
            "assetId": "33",
            "chainId": "POLYGON",
            "chainCategory": "EVM",
            "currencyType": "MATIC",
            "collectGasAmount": "0.00023"
          },
          "userBalance": [
            {
              "userAddress": "0x17F547ae02a94a0339c4CFE034102423907c4592",
              "userBalance": "0.434343"
            },
            {
              "userAddress": "0x35F547ae02a94a0339c4CFE034102423907c4592",
              "userBalance": "0.89"
            }
          ]
        },
        {
          "assetId": "54",
          "chainId": "POLYGON",
          "chainCategory": "EVM",
          "currencyType": "USDC",
          "decimal": "18",
          "currencyIcon": "imageUrl",
          "collectCurrencyAmount": "0.5",
          "collectGasInformation": {
            "assetId": "33",
            "chainId": "POLYGON",
            "chainCategory": "EVM",
            "currencyType": "MATIC",
            "collectGasAmount": "0.00023"
          },
          "userBalance": [
            {
              "userAddress": "0x17F547ae02a94a0339c4CFE034102423907c4592",
              "userBalance": "1.954343"
            },
            {
              "userAddress": "0x35F547ae02a94a0339c4CFE034102423907c4592",
              "userBalance": "2.47"
            }
          ]
        }
      ],
      "fiat": []
    },
    "clientRequestedAssetQuantity": "2",
    "userSelectedAsset": null,
    "userSelectedAssetQuantity": null,
    "singularityTransactionSubType": null,
    "singularityTransactionType": "RECEIVE",
    "singularityTransactionExchangeMode": null,
    "createdDate": null,
    "modifiedDate": null
  },
  "status": "SUCCESS"
}});
```
  
  

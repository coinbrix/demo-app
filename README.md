# Getting Started with Singularity Web SDK
This is a demo web-app to use Singularity web-sdk.

# Integration steps
1. Add the following self-calling function snippet and supporting snippet in your root-html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <link href="https://unpkg.com/game-pay-web-sdk@1.9.0-sandbox.10/main.css" rel="stylesheet">
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
      })(window, document, "script", "Singularity", "https://unpkg.com/game-pay-web-sdk@1.9.0-sandbox.10/main.js");
      Singularity('init', {
        GAMEPAY_API_KEY: 2
      });
    </script>
  </head>
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
  
  

const SANDBOX_ENV = 'sandbox';
const PRODUCTION_ENV = 'production';
const DEVELOPMENT_ENV = "qal";
window.SingularityEnv = window.SingularityEnv? window.SingularityEnv: PRODUCTION_ENV;
const env = window.SingularityEnv;

const game_url_string = new URL(location.href);
const mountingIntervalTime = 1000;

let host = "https://qal.s9y-sandbox.gg";
//If the client is mobile, than use the mobile qal url - will add ios condition later
if(window && window.SingularityMobileSdk){
  host = "https://qal-mobile.s9y-sandbox.gg/"
}

if (env === PRODUCTION_ENV) {
  host = "https://app.s9y.gg";
} else if (env === SANDBOX_ENV) {
  host = "https://app.s9y-sandbox.gg";
}

host = 'http://localhost:9080'

let iframeObj;
let isIframeLoaded = false;

const SINGULARITY_API_KEY = 'SINGULARITY_API_KEY';
const SINGULARITY_CLIENT_DATA = 'SINGULARITY_CLIENT_DATA';
const SINGULARITY_ACCOUNT_DATA = 'SINGULARITY_ACCOUNT_DATA';

window.onload = () => {

  const fetchMetaData = async (apikey) => {
    const cerebro_prefix = 'https://cerebro.s9y';
    let prefix = `${cerebro_prefix}-${DEVELOPMENT_ENV}.com`;
    if(env === PRODUCTION_ENV) {
      prefix = `${cerebro_prefix}.gg`;
    } else if (env === SANDBOX_ENV) {
      prefix = `${cerebro_prefix}-${SANDBOX_ENV}.gg`;
    }
    const API_CLIENT_ROUTE = `${prefix}/v1/sdk-protected/get_singularity_client_info`;
    try {
      if (!apikey) throw new Error('Invalid api key');
      let respJson = await fetch(API_CLIENT_ROUTE, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'x-api-key': apikey,
          'Content-Type': 'application/json'
        }
      });
      respJson = await respJson.json();
      //TODO: handled properly
      respJson.isGamePayClientVerified = respJson.isSingularityClientVerified;
      respJson.gamePayClientId = respJson.singularityClientId;
      if (!respJson || !respJson?.isGamePayClientVerified) return undefined;
      return respJson;
    } catch (error) {
      console.error(error);
    }
  };

  function setSingularityEvents() {
    window.SingularityEvent = {
      customAuth: (method, data) => iframeObj.contentWindow.postMessage(`{"eventName":"SingularityEvent-customAuth","metaData":{"method":"${method}", "data": ${JSON.stringify(data)}}}`, host),
      open: () => {
        iframeObj.contentWindow.postMessage('{"eventName":"SingularityEvent-open","metaData":{}}', host)
      },
      close: () => iframeObj.contentWindow.postMessage('{"eventName":"SingularityEvent-close","metaData":{}}', host),
      getConnectUserInfo: () => {
        return new Promise((res) => {
          iframeObj.contentWindow.postMessage('{"eventName":"SingularityEvent-getConnectUserInfo","metaData":{}}', host);
          const handleUserInfo = (e) => {
            try {
              const { metaData, name } = JSON.parse((e.data));
              if (name !== 'SingularityEvent-getConnectUserInfo') {
                return;
              }
              res({metaData, name});
              window.removeEventListener('message', handleUserInfo);
            } catch(e) {
              console.log('Inside catch', e);
            }
          };
          window.addEventListener('message', handleUserInfo);
        });
      },
      subscribe: (eventName, callback) => {
        window.addEventListener('message', (e) => {
          try {
            const { metaData, name } = JSON.parse((e.data));
            if(name !== eventName) {
              return;
            }
            callback(metaData);
          } catch(e) {
          }
        });
      },
      requestPersonalSignature: (messageToSign) => {
        return new Promise((res) => {
          iframeObj.contentWindow.postMessage(`{"eventName":"SingularityEvent-requestPersonalSignature","metaData":{"messageToSign":"${messageToSign}"}}`, host);
          const handleRequestPersonalSignature = (e) => {
            try {
              const { metaData, name } = JSON.parse((e.data));
              if (name !== 'SingularityEvent-requestPersonalSignature') {
                return;
              }
              if(window && window.SingularityMobileSdk){
                window.SingularityMobileSdk.onSignatureReceived(metaData)
              }
              if(
                window &&
                window.webkit &&
                window.webkit.messageHandlers &&
                window.webkit.messageHandlers.SingularityMobileSdk
              ){
                window.webkit.messageHandlers.SingularityMobileSdk.postMessage(
                  JSON.stringify({
                    onSignatureReceived: {
                      metaData: metaData
                    }
                  })
                );
              }
              res({metaData, name});
              window.removeEventListener('message', handleRequestPersonalSignature);
            } catch(e) {
              console.log('Inside catch, handleRequestPersonalSignature', e);
            }
          }
          window.addEventListener('message', handleRequestPersonalSignature);
        });
      },
      requestTypedSignature: (domain, primaryType, types, message) => {
        return new Promise((res) => {
          const messageObject = `{
            "eventName": "SingularityEvent-requestTypedSignature",
            "metaData": {
              "primaryType": "${primaryType}",
              "domain": ${JSON.stringify(domain)},
              "message": ${JSON.stringify(message)},
              "types": ${JSON.stringify(types)}
            }
          }`;
          iframeObj.contentWindow.postMessage(messageObject, host);
          const handleRequestTypedSignature = (e) => {
            try {
              const { metaData, name } = JSON.parse((e.data));
              if (name !== 'SingularityEvent-requestTypedSignature') {
                return;
              }
              res({metaData, name});
              window.removeEventListener('message', handleRequestTypedSignature);
            } catch(e) {
              console.log('Inside catch, handleRequestTypedSignature', e);
            }
          }
          window.addEventListener('message', handleRequestTypedSignature);
        });
      },
      logout: () => {
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityEvent-logout"}`, host);
      },
      transactionFlow: (txnDataJsonString, txnDataHash) => iframeObj.contentWindow.postMessage(`{"eventName":"SingularityEvent-transactionFlow","metaData":{"txnDataHash":"${txnDataHash}", "txnDataJsonString": ${txnDataJsonString}}}`, host),
    }
  }

  function setSingularityMobileEvents() {
    window.SingularityMobile = {
      onAuthTokenReceived: (accessToken, idToken) => {
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityMobile-onAuthTokenReceived","metaData":{"accessToken":"${accessToken}", "idToken": "${idToken}"}}`, host)
      },
      onCoinbaseWalletConnected: (chain, networkId, address) => {
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityMobile-onCoinbaseWalletConnected","metaData":{"chain":"${chain}", "networkId": "${networkId}", "address": "${address}"}}`, host)
      },
      requestTypedSignature: (typedSignatureJsonString) => {
        const {domain, types, message, primaryType} =  typedSignatureJsonString;
        return new Promise((res) => {
          const messageObject = `{
            "eventName": "SingularityEvent-requestTypedSignature",
            "metaData": {
              "primaryType": "${primaryType}",
              "domain": ${JSON.stringify(domain)},
              "message": ${JSON.stringify(message)},
              "types": ${JSON.stringify(types)}
            }
          }`;
          iframeObj.contentWindow.postMessage(messageObject, host);
          const handleRequestTypedSignature = (e) => {
            try {
              const { metaData, name } = JSON.parse((e.data));
              if (name !== 'SingularityEvent-requestTypedSignature') {
                return;
              }
              if(window && window.SingularityMobileSdk){
                window.SingularityMobileSdk.onSignatureReceived(metaData)
              }
              if(
                window &&
                window.webkit &&
                window.webkit.messageHandlers &&
                window.webkit.messageHandlers.SingularityMobileSdk
              ){
                window.webkit.messageHandlers.SingularityMobileSdk.postMessage(
                  JSON.stringify({
                    onSignatureReceived: {
                      metaData: metaData
                    }
                  })
                );
              }
              res({metaData, name});
              window.removeEventListener('message', handleRequestTypedSignature);
            } catch(e) {
              console.log('Inside catch, handleRequestTypedSignature', e);
            }
          }
          window.addEventListener('message', handleRequestTypedSignature);
        });
      },
      transactionFlow: (txnDataJsonString, txnDataHash) => {
        txnDataJsonString = JSON.stringify(txnDataJsonString)
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityEvent-transactionFlow","metaData":{"txnDataHash":"${txnDataHash}", "txnDataJsonString": ${txnDataJsonString}}}`, host)
      },
      coinbaseNativeTransactionHashReceived: (txHash) => {
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityMobile-coinbaseNativeTransactionHashReceived","metaData":{"txHash":"${txHash}"}}`, host)
      },
      coinbaseNativeTransactionFailed: () => {
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityMobile-coinbaseNativeTransactionFailed","metaData":{}}`, '*')
      },
      handleApprovalFlowCoinbaseMobileTxHashReceived: (txHash) => {
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityMobile-handleApprovalFlowCoinbaseMobileTxHashReceived","metaData":{"txHash":"${txHash}"}}`, host)
      },
      signatureReceivedFromCoinbaseMobileForTypedMessage: (txHash) => {
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityMobile-signatureReceivedFromCoinbaseMobileForTypedMessage","metaData":{"txHash":"${txHash}"}}`, host)
      },
      coinbaseMobileApprovalErrorForNonNativeTransaction: () => {
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityMobile-coinbaseMobileApprovalErrorForNonNativeTransaction","metaData":{}}`, host)
      },
      coinbaseMobileTypedMessageSigningErrorForNonNativeTransaction: () => {
        iframeObj.contentWindow.postMessage(`{"eventName":"SingularityMobile-coinbaseMobileTypedMessageSigningErrorForNonNativeTransaction","metaData":{}}`, host)
      },

    }
  }

  function createIframe() {
    const iframeObj = window.document.createElement('iframe');
    iframeObj.setAttribute('src', host);
    iframeObj.setAttribute('id', `SingularityEvent__wrapper__iframe`);
    const isMobile = window?.navigator?.userAgentData?.mobile;
    const iframeWidth = isMobile? window.innerWidth: "400";
    iframeObj.setAttribute('height', window.innerHeight);
    iframeObj.setAttribute("allow", "clipboard-read; clipboard-write");

    let iframeStyle;
    if((window && window.SingularityMobileSdk) || (window && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.SingularityMobileSdk) || (window.navigator.userAgent.includes("UnrealEngine"))){
      iframeStyle = `
      overflow: hidden;
      overflow-x: hidden;
      overflow-y: hidden;
      height: 100%;
      width: 100%;
      position: fixed;
      z-index: 100;
      top: 0px;
      right: 0px;
      border: none;
      display: none;`
      ;
    }
    else{
      iframeStyle = `
      overflow: hidden;
      overflow-x: hidden;
      overflow-y: hidden;
      height: 100%;
      width: ${iframeWidth}px;
      z-index: 100;
      position: fixed;
      top: 0px;
      right: 0px;
      border: none;
      display: none;`
      ;
    }


    iframeObj.setAttribute('style', iframeStyle);
    return iframeObj;
  }

  function markSingularityMounted(mountingInterval) {
    const singu_id = 'Singularity';
    const singuScript = document.getElementById(singu_id);
    if(
      singuScript !== null &&
      window.Singularity.init &&
      window.SingularityEvent &&
      Object.keys(window.SingularityEvent).length !== 0 &&
      isIframeLoaded === true &&
      !window.Singularity.isMounted
    )
    {
      const event = new Event(`${singu_id}-mounted`);
      window.Singularity.isMounted = true;
      document.getElementsByTagName('body')[0].dispatchEvent(event);
      clearInterval(mountingInterval);
      const lsClientData = localStorage.getItem(SINGULARITY_CLIENT_DATA);
      const lsApiKey = localStorage.getItem(SINGULARITY_API_KEY);
      const lsAccountData = localStorage.getItem(SINGULARITY_ACCOUNT_DATA);
      setTimeout(() => {
        const initMessage = JSON.stringify({
          metaData: {
            accountData: lsAccountData,
            api_key: lsApiKey,
            gameOrigin: window.location.origin,
            clientData: lsClientData,
            eventName: "SingularityEvent-init"
          }
        })
        iframeObj.contentWindow.postMessage(initMessage, host);
      }, mountingIntervalTime);
    }
  }

  function addEventListner() {
    window.addEventListener('message', (e) => {
      try {
        const { name, userMetaData } = JSON.parse((e.data));
        if(name === 'SingularityEvent-close') {
          setTimeout(() => {
            document.getElementById('SingularityEvent__wrapper__iframe').style.display='none';
          }, 100);
        }
        if(name === 'SingularityEvent-open') {
          document.getElementById('SingularityEvent__wrapper__iframe').style.display='block';
        }
        if(name === 'SingularityEvent-mounted') {
          setMountingInterval();
        }
        if(name === 'SingularityEvent-login') {
          const { userMetaData, token } = JSON.parse((e.data));
          if(userMetaData && token) {
            localStorage.setItem(SINGULARITY_ACCOUNT_DATA, JSON.stringify({...JSON.parse(userMetaData), token}));
          }
        }
        if(name === 'SingularityEvent-logout') {
          localStorage.removeItem(SINGULARITY_ACCOUNT_DATA);
        }
      } catch(e) {
      }
    });
  }

  function signularityInjection() {
    iframeObj = createIframe();
    iframeObj.addEventListener('load', () => {
      isIframeLoaded = true;
      setSingularityEvents();
      setSingularityMobileEvents();
      addEventListner();
    });
    document.getElementsByTagName('body')[0].appendChild(iframeObj);
  }

  signularityInjection();

  function setMountingInterval() {
    const mountingInterval = setInterval(() => {
      markSingularityMounted(mountingInterval);
    }, 100);
  }

  setMountingInterval();

  window.Singularity = {
    init: (API_KEY, callback= () => {}) => {
      let clientData = localStorage.getItem(SINGULARITY_CLIENT_DATA);
      const clientApiKey = localStorage.getItem(SINGULARITY_API_KEY);

      // No need to fetch meta data dispatch mouting event and call the game callback
      if (clientData && clientApiKey && API_KEY === clientApiKey) {
        try {
          clientData = JSON.parse(clientData);
        } catch (e) {
          console.error(e);
        }
        const initMessage = JSON.stringify({
          metaData: {
            api_key: API_KEY,
            gameOrigin: window.location.origin,
            clientData: clientData,
            eventName: "SingularityEvent-init"
          }
        })
        iframeObj.contentWindow.postMessage(initMessage, host);
        callback();
        setMountingInterval();
        return;
      }
      // Fetch meta data, dispatch mouting event, set ls and call the game callback
      fetchMetaData(API_KEY).then((response) => {
        setTimeout(() => {
          const initMessage = JSON.stringify({
            metaData: {
              api_key: API_KEY,
              gameOrigin: window.location.origin,
              clientData: response,
              eventName: "SingularityEvent-init"
            }
          })
          iframeObj.contentWindow.postMessage(initMessage, host);
          callback();
          setMountingInterval();

          // set local storage item
          localStorage.setItem(SINGULARITY_CLIENT_DATA, JSON.stringify(response));
          localStorage.setItem(SINGULARITY_API_KEY, API_KEY);
        }, mountingIntervalTime);
      });
    }
  };
}
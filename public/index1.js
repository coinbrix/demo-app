// <script src="web3-onboard.bundle.js"></script>

class SingularityBL {

  constructor() {
    this.setExternalScripts();
  }

  setExternalScripts = () => {
    createScript(document, 'script', 'ethers-sdkjs', 'https://cdn.ethers.io/scripts/ethers-v4.min.js');
    createScript(document, 'script', 'web3onboardbundle', 'web3onboard/web3-onboard.bundle.js');
    createScript(document, 'script', 'web3onboardreact', 'web3onboardreact/web3-onboard-react.bundle.js');
    createScript(document, 'script', 'web3onboardcoinbase', 'web3onboardcoinbase/web3-onboard-coinbase.bundle.js');
    createScript(document, 'script', 'web3onboardinjectedwallets', 'web3onboardinjectedwallets/web3-onboard-injected-wallets.bundle.js');
    createScript(document, 'script', 'web3onboardwalletconnect', 'web3onboardwalletconnect/web3-onboard-wallet-connect.bundle.js');

    // createScript(document, 'script', 'react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.development.js');
    // createScript(document, 'script', 'react', 'https://unpkg.com/react@18.2.0/umd/react.development.js');

    createScript(document, 'script', 'react-dom', 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js');
    createScript(document, 'script', 'react', 'https://unpkg.com/react@17.0.2/umd/react.development.js');

    createScript(document, 'script', 'component', 'component.js');

    // setTimeout(() => {
    //   const { Onboard, injectedModule } = web3Onboard;
    //   const { walletConnectModule  } = web3OnboardWalletConnect
    //
    //   const { useState, useEffect, useCallback} = React;
    //
    //
    //   const walletConnectSdk = walletConnectModule({
    //     qrcodeModalOptions: {
    //       mobileLinks: ['metamask', 'argent', 'trust']
    //     },
    //     connectFirstChainId: true
    //   });
    //
    //
    //   const injected = injectedModule()
    //
    //   const onboard = Onboard({
    //     theme: 'dark',
    //     wallets: [injected, walletConnectSdk],
    //     chains: [
    //       {
    //         id: '0x13881',
    //         token: 'MATIC',
    //         label: 'Polygon Mumbai',
    //         rpcUrl: `https://skilled-dawn-research.matic-testnet.quiknode.pro/ad667afe0dad9b979ffb5053038c93cf1ce4b066/`
    //       }
    //     ]
    //   })
    //
    //   console.log('onboard', onboard)
    //
    //   onboard.connectWallet().then((wallets) => {
    //     console.log(wallets)
    //   })
    // }, 7000)
  }

  updateLocalStore = (action) => {
    const { SINGULARITY_REQ_PERSONAL_SIG, SINGULARITY_OPEN } = EVENTS;
    switch(action.event) {
      case SINGULARITY_OPEN: {
        Singularity.localStore.isDrawerOpen = action.state;
      }
      case SINGULARITY_CLOSE: {
        Singularity.localStore.isDrawerOpen = action.state;
      }
      case SINGULARITY_REQ_PERSONAL_SIG: {
        // Singularity.localStore;
      }
      case SINGULARITY_LOGIN: {
        Singularity.localStore.loginMode = action.state;
      }
      default:
    }
  }

  handleWeb3PersonalSign = async (messageToSign) => {
    await window.ethereum.enable();
    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = etherProvider.getSigner();
    signer.signMessage(messageToSign).then((signedData) => {
      // alert(signedData);
      console.log('Personal signature', signedData);
    });
  }

  handleWeb3TypedSign = async (domain, primaryType, types, message) => {
    if (types['EIP712Domain']) delete types['EIP712Domain'];

    await window.ethereum.enable();
    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = etherProvider.getSigner();
    console.log('signer', signer)
    const typedSignature = await signer._signTypedData(
      domain,
      types,
      message
    );
    console.log('Typed Signature', typedSignature)
  }
}
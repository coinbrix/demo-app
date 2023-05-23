class SingularityBL {

  constructor() {
    this.setExternalScripts();
  }

  setExternalScripts = () => {
    createScript(document, 'script', 'ethers-sdkjs', 'https://cdn.ethers.io/scripts/ethers-v4.min.js');
    // createScript(document, 'script', 'web3-onboard-core', 'https://unpkg.com/web3-onboard-core@2.3.1/dist/index.js');
    // createScript(document, 'script', 'web3-onboard-core', 'https://cdn.jsdelivr.net/npm/@web3-onboard/core@2.19.2/dist/index.min.js');
    createScript(document, 'script', 'web3-onboard-core', 'https://cdn.jsdelivr.net/npm/web3-onboard-core@2.3.1/dist/index.js');
    createScript(document, 'script', 'web3-onboard-common', 'https://cdn.jsdelivr.net/npm/@web3-onboard/common@2.3.3/dist/index.min.js');
    createScript(document, 'script', 'web3-onboard-injected-wallets', 'https://cdn.jsdelivr.net/npm/@web3-onboard/injected-wallets@2.9.0/dist/index.min.js');
    createScript(document, 'script', 'web3-onboard-wallet-connect', 'https://cdn.jsdelivr.net/npm/@web3-onboard/walletconnect@2.3.8/dist/index.min.js');
    createScript(document, 'script', 'web3-onboard-react', 'https://cdn.jsdelivr.net/npm/@web3-onboard/react@2.8.4/dist/index.min.js');
    createScript(document, 'script', 'web3-onboard-coinbase', 'https://cdn.jsdelivr.net/npm/@web3-onboard/coinbase@2.2.4/dist/index.min.js');
    // createScript(document, 'script', 'redux-sdkjs', 'https://cdnjs.cloudflare.com/ajax/libs/redux/4.2.1/redux.min.js');
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
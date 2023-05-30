// Get a reference to the root div
console.log('component-js')
const divElement = document.createElement("div");
divElement.id = 'singularity-script-root'
document.body.appendChild(divElement);

setTimeout(() => {
  const rootElement = document.getElementById('singularity-script-root');
  function App() {
    const { init, useConnectWallet, useWallets  } = web3OnboardReact
    const { coinbaseWalletModule  } = web3OnboardCoinbase
    const { injectedModule  } = web3OnboardInjectedWallets
    const { walletConnectModule  } = web3OnboardWalletConnect

    const useCallback = React.useCallback

    const injectedWalletSdk = injectedModule();
    const coinbaseWalletSdk = coinbaseWalletModule();
    const walletConnectSdk = walletConnectModule({
      qrcodeModalOptions: {
        mobileLinks: ['metamask', 'argent', 'trust']
      },
      connectFirstChainId: true
    });

    init({
      wallets: [coinbaseWalletSdk, injectedWalletSdk, walletConnectSdk],
      chains: [
        {
          id: '0x13881',
          token: 'MATIC',
          label: 'Polygon Mainnet',
          rpcUrl: 'https://skilled-dawn-research.matic-testnet.quiknode.pro/ad667afe0dad9b979ffb5053038c93cf1ce4b066/'
        }
      ],
      appMetadata: {
        // name: GAMEPAY_LABEL,
        name: 'Singularity',
        // description: GAMEPAY_DESCRIPTION
        description: 'One Stop Web3 Gaming wallet integration'
      },
      accountCenter: {
        desktop: {
          enabled: false
        },
        mobile: {
          enabled: false
        }
      },
      i18n: {
        en: {
          connect: {
            selectingWallet: {
              // header: WEB3_ONBOARD_HEADER,
              header: 'Connect your wallets',
              sidebar: {
                // header: WELCOME_STRING,
                header: 'Welcome',
                // subHeading: GAMEPAY_DESCRIPTION,
                subHeading: 'One Stop Web3 Gaming wallet integration',
                // paragraph: EMPTY_STRING
                paragraph: ''
              }
            }
          }
        }
      }
    });





    // const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      console.log('------Component mounted------');


      const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

      connect({
        autoSelect: {
          label: 'Metamask',
          disableModals: true
        }
      }).then((walletData) => {
        console.log('walletData', walletData)
      })

      return () => {
        console.log('------Component unmounted-------');
      };



    }, []);

    // const increment = () => {
    //   setCount(count + 1);
    // };

    return React.createElement(
      'div',
      null,
    );

    // return React.createElement(
    //   'div',
    //   null,
    //   React.createElement('p', null, `Count: ${count}`),
    //   React.createElement('button', { onClick: increment }, 'Increment')
    // );
  }

// Call the App function to render the component
  ReactDOM.render(React.createElement(App), rootElement);
}, 7000)
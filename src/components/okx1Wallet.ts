import { DefaultWalletOptions, Wallet } from '@rainbow-me/rainbowkit/dist/wallets/Wallet';
import { getWalletConnectConnector } from '@rainbow-me/rainbowkit';

export type OKXWalletOptions = DefaultWalletOptions;

export const okx1Wallet = ({
    projectId,
    walletConnectParameters,
  }: OKXWalletOptions): Wallet => {
    const isOKXInjected = false
    const shouldUseWalletConnect = !isOKXInjected;
  
    return {
      id: 'okx1',
      name: 'OKX Wallet 1',
      rdns: 'com.okex.wallet',
      iconUrl:
        "data:image/svg+xml,<svg width=&quot;512&quot; height=&quot;512&quot; viewBox=&quot;0 0 512 512&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;>%0A<rect width=&quot;512&quot; height=&quot;512&quot; fill=&quot;black&quot;/>%0A<path d=&quot;M67.8275 284.642C65.2758 277.745 64 270.6 64 263.193C64 254.255 65.2758 246.09 68.0826 238.428C90.5516 177.407 170.979 158 268.766 158C366.552 158 428.338 185.062 444.173 227.959C446.724 234.855 448 242 448 249.407C448 258.345 446.724 266.51 443.917 274.173C421.448 335.193 341.021 354.6 243.235 354.6C145.448 354.6 83.6622 327.531 67.8275 284.642ZM193.696 273.152C198.8 286.938 220.503 298.428 250.889 298.428C284.338 298.428 310.124 288.469 318.041 267.276C320.593 260.889 320.848 257.062 320.848 252.724C320.848 248.897 320.848 245.572 318.296 239.448C313.193 225.662 291.49 214.173 261.103 214.173C227.655 214.173 201.869 224.131 193.951 245.324C191.4 251.711 191.145 255.538 191.145 259.876C191.145 263.704 191.145 267.028 193.696 273.152Z&quot; fill=&quot;white&quot;/>%0A<path d=&quot;M229.477 263.47C231.65 269.339 240.887 274.231 253.827 274.231C268.066 274.231 279.045 269.995 282.413 260.969C283.499 258.25 283.609 256.624 283.609 254.773C283.609 253.139 283.609 251.732 282.522 249.122C280.35 243.254 271.113 238.362 258.173 238.362C243.934 238.362 232.955 242.598 229.587 251.623C228.501 254.342 228.391 255.968 228.391 257.82C228.391 259.453 228.391 260.86 229.477 263.47Z&quot; fill=&quot;white&quot;/>%0A</svg>%0A",
      iconAccent: '#000',
      iconBackground: '#000',
      downloadUrls: {
        android:
          'https://play.google.com/store/apps/details?id=com.okinc.okex.gp',
        ios: 'https://itunes.apple.com/app/id1327268470?mt=8',
        mobile: 'https://okx.com/download',
        qrCode: 'https://okx.com/download',
        chrome:
          'https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge',
        edge: 'https://microsoftedge.microsoft.com/addons/detail/okx-wallet/pbpjkcldjiffchgbbndmhojiacbgflha',
        firefox: 'https://addons.mozilla.org/firefox/addon/okexwallet/',
        browserExtension: 'https://okx.com/download',
      },
      mobile: {
        getUri: shouldUseWalletConnect
          ? (uri: string) => {
              return isAndroid()
                ? uri
                : `okex://main/wc?uri=${encodeURIComponent(uri)}`;
            }
          : undefined,
      },
      qrCode: shouldUseWalletConnect
        ? {
            getUri: (uri: string) => uri,
            instructions: {
              learnMoreUrl: 'https://okx.com/web3/',
              steps: [
                {
                  description: 'wallet_connectors.okx.qr_code.step1.description',
                  step: 'install',
                  title: 'wallet_connectors.okx.qr_code.step1.title',
                },
                {
                  description: 'wallet_connectors.okx.qr_code.step2.description',
                  step: 'create',
                  title: 'wallet_connectors.okx.qr_code.step2.title',
                },
                {
                  description: 'wallet_connectors.okx.qr_code.step3.description',
                  step: 'scan',
                  title: 'wallet_connectors.okx.qr_code.step3.title',
                },
              ],
            },
          }
        : undefined,
      extension: {
        instructions: {
          learnMoreUrl: 'https://okx.com/web3/',
          steps: [
            {
              description: 'wallet_connectors.okx.extension.step1.description',
              step: 'install',
              title: 'wallet_connectors.okx.extension.step1.title',
            },
            {
              description: 'wallet_connectors.okx.extension.step2.description',
              step: 'create',
              title: 'wallet_connectors.okx.extension.step2.title',
            },
            {
              description: 'wallet_connectors.okx.extension.step3.description',
              step: 'refresh',
              title: 'wallet_connectors.okx.extension.step3.title',
            },
          ],
        },
      },
  
      createConnector: getWalletConnectConnector({
        projectId,
        walletConnectParameters,
      })
    };
  };
  
function isAndroid(): boolean {
  return (
    typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)
  );
}
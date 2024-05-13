import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2"
import { bsc, mainnet, polygon } from "wagmi/chains"
import { Wallet, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { DefaultWalletOptions, WalletDetailsParams } from "@rainbow-me/rainbowkit/dist/wallets/Wallet"
import binanceWallet from "@binance/w3w-rainbow-connector"
import { Connector, createConnector } from "wagmi"

const getConnector = getWagmiConnectorV2()

async function getWalletConnectUri(connector: Connector): Promise<string> {
    const provider = await connector.getProvider()
    return new Promise<string>((resolve) => (provider as any).once("uri_ready", resolve))
}

const connector = getConnector()

export const binanceWeb3Wallet = ({ projectId, walletConnectParameters }: DefaultWalletOptions): Wallet => ({
    id: "binanceWeb3",
    name: "Binance Web3 Wallet",
    rdns: "com.binance",
    iconUrl:
        "data:image/svg+xml,<svg width=&quot;512&quot; height=&quot;512&quot; viewBox=&quot;0 0 512 512&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;>%0A<rect width=&quot;512&quot; height=&quot;512&quot; fill=&quot;black&quot;/>%0A<path d=&quot;M67.8275 284.642C65.2758 277.745 64 270.6 64 263.193C64 254.255 65.2758 246.09 68.0826 238.428C90.5516 177.407 170.979 158 268.766 158C366.552 158 428.338 185.062 444.173 227.959C446.724 234.855 448 242 448 249.407C448 258.345 446.724 266.51 443.917 274.173C421.448 335.193 341.021 354.6 243.235 354.6C145.448 354.6 83.6622 327.531 67.8275 284.642ZM193.696 273.152C198.8 286.938 220.503 298.428 250.889 298.428C284.338 298.428 310.124 288.469 318.041 267.276C320.593 260.889 320.848 257.062 320.848 252.724C320.848 248.897 320.848 245.572 318.296 239.448C313.193 225.662 291.49 214.173 261.103 214.173C227.655 214.173 201.869 224.131 193.951 245.324C191.4 251.711 191.145 255.538 191.145 259.876C191.145 263.704 191.145 267.028 193.696 273.152Z&quot; fill=&quot;white&quot;/>%0A<path d=&quot;M229.477 263.47C231.65 269.339 240.887 274.231 253.827 274.231C268.066 274.231 279.045 269.995 282.413 260.969C283.499 258.25 283.609 256.624 283.609 254.773C283.609 253.139 283.609 251.732 282.522 249.122C280.35 243.254 271.113 238.362 258.173 238.362C243.934 238.362 232.955 242.598 229.587 251.623C228.501 254.342 228.391 255.968 228.391 257.82C228.391 259.453 228.391 260.86 229.477 263.47Z&quot; fill=&quot;white&quot;/>%0A</svg>%0A",
    iconAccent: "#1E1E1E",
    iconBackground: "#1E1E1E",
    downloadUrls: {
        android: "https://play.google.com/store/apps/details?id=com.binance.dev",
        ios: "https://apps.apple.com/us/app/binance-buy-bitcoin-crypto/id1436799971",
        mobile: "https://www.binance.com/en/download",
        qrCode: "https://www.binance.com/en/download",
        browserExtension: "https://www.binance.com/en/download",
    },
    mobile: {
        getUri: (uri: string) => uri,
    },
    qrCode: {
        getUri: (uri: string) => uri,
        instructions: {
            learnMoreUrl: "https://my-wallet/learn-more",
            steps: [
                {
                    description: "We recommend putting My Wallet on your home screen for faster access to your wallet.",
                    step: "install",
                    title: "Open the My Wallet app",
                },
                {
                    description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                    step: "scan",
                    title: "Tap the scan button",
                },
            ],
        },
    },
    extension: {
        instructions: {
            learnMoreUrl: "https://my-wallet/learn-more",
            steps: [
                {
                    description: "We recommend pinning My Wallet to your taskbar for quicker access to your wallet.",
                    step: "install",
                    title: "Install the My Wallet extension",
                },
                {
                    description:
                        "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                    step: "create",
                    title: "Create or Import a Wallet",
                },
                {
                    description:
                        "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                    step: "refresh",
                    title: "Refresh your browser",
                },
            ],
        },
    },
    createConnector: (walletDetails: WalletDetailsParams) =>
        // @ts-ignore
        createConnector((config) => ({
            ...getConnector({
                showQrCodeModal: true,
            })(config),
            ...walletDetails,
        })),
})

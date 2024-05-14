"use client"

import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2"
import { bsc, mainnet, polygon } from "wagmi/chains"
import { Wallet, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { DefaultWalletOptions, WalletDetailsParams } from "@rainbow-me/rainbowkit/dist/wallets/Wallet"
import binanceWallet from "@binance/w3w-rainbow-connector"
import { Connector, createConnector } from "wagmi"
import binance from "./binance.svg"

const getConnector = getWagmiConnectorV2()

export const binanceWeb3Wallet = ({ projectId, walletConnectParameters }: DefaultWalletOptions): Wallet => ({
    id: "binanceWeb3",
    name: "Binance Web3 Wallet",
    rdns: "com.binance",
    iconUrl: binance.src,
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

import { useAccount } from "wagmi"

export default function useWalletName() {
    const account = useAccount()
    const connector = account.connector

    connector?.id
}

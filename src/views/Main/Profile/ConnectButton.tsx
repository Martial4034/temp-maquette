import { useTranslation } from "react-i18next";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";

import InfoItem from "./InfoItem"
import { shortenAddress } from "../../../utils/Normal";
import { useAppContext } from "../../../contexts/AppContext";

const ConnectButton = () => {
    const { t } = useTranslation();
    const { setWalletModalStatus } = useAppContext();
    const [tonConnectUI] = useTonConnectUI();
    const walletAddress = useTonAddress();

    const handleAction = () => {
        if (walletAddress) {
            WebApp.showConfirm(t("disconnect_description"), (confirm) => {
                if (confirm) {
                    handleDisconnect()
                }
            })
        } else {
            tonConnectUI.openModal();
        }
        vibrate()
    }

    const handleDisconnect = () => {
        vibrate()
        tonConnectUI.disconnect();
    }

    const vibrate = () => {
        WebApp.HapticFeedback.impactOccurred('medium')
    }

    tonConnectUI.onModalStateChange((change) => {
        setWalletModalStatus(change.status)
    })

    return (
        <InfoItem>
            <div className="text-xl lg:text-3xl" onClick={handleAction}>{walletAddress ? shortenAddress(walletAddress) : t('wallet_connect')}</div>
        </InfoItem>
    )
}

export default ConnectButton
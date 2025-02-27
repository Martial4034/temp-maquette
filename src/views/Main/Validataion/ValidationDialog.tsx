import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTonAddress } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";

import BasicDialog from "../../../components/BasicDialog"
import { useAppContext } from "../../../contexts/AppContext";
import Item from "./Item";

const ValidationDialog = () => {
    const { t } = useTranslation();
    const { showDialog, setMode } = useAppContext()
    const walletAddress = useTonAddress();

    const [isSufficient, setIsSufficient] = useState(true)

    const toggleDialog = (newMode: string) => {
        setMode(newMode);
        vibrate()
    };

    const vibrate = () => {
        WebApp.HapticFeedback.impactOccurred('medium')
    }

    if (!showDialog) {
        return null
    }

    return (
        <BasicDialog>
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="grid w-full grid-cols-2 gap-4 lg:gap-8 px-8 pt-8">
                    <Item title={walletAddress ? t("wallet_connected") : t("wallet_disconnected")} disable={walletAddress === '' ? true : false} />
                    <Item title={t("ton_sufficient")} disable={!isSufficient} />
                    <Item title={t("invitation_friend")} subTitle={t("coming_soon")} disable={true} />
                    <Item title={t("keep_going")} subTitle={"2/3"} disable={walletAddress === '' || !isSufficient} active={walletAddress !== '' && isSufficient} action={() => toggleDialog('rule')} />
                </div>
            </div>
        </BasicDialog>
    )
}

export default ValidationDialog
import { useState } from "react";
import { useTranslation } from "react-i18next";
import WebApp from "@twa-dev/sdk";

import BasicDialog from "../../../components/BasicDialog"
import { useAppContext } from "../../../contexts/AppContext";

import InfoItem from "./InfoItem";
import EarnButton from "./EarnButton";
import StartButton from "./StartButton";

const RuleDialog = () => {
    const { t } = useTranslation();
    const { showDialog, setMode } = useAppContext()
    const [start, setStart] = useState(false)
    const [pending, setPending] = useState(false)

    const ValidationItems = [
        {
            title: t("waiting_rule"),
            description: t("waiting_description"),
        },
        {
            title: t("launch_rule"),
            description: t("launch_description"),
        },
        {
            title: t("tie_rule"),
            description: t("tie_description"),
        },
    ];

    const handleEarn = () => {
        setStart(true)
        vibrate()
    }

    const handlePending = () => {
        setPending(true)
        vibrate()
    }

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
            <div className="relative flex flex-col h-full w-full items-center justify-center">
                {!start ?
                    <>
                        <div className="w-full flex items-center justify-around gap-4">
                            {ValidationItems.map((item, index) => {
                                return (
                                    <InfoItem>
                                        <div className="lg:text-2xl">{`${index + 1}. ${item.title}`}</div>
                                        <div className="text-xs lg:text-xl mt-2 lg:mt-4">{item.description}</div>
                                    </InfoItem>
                                );
                            })}
                        </div>
                        <div className="w-full mt-4 lg:mt-8">
                            <EarnButton title={t("earn_now")} subTitle="3/3" action={handleEarn} />
                        </div>
                    </>
                    :
                    (!pending ?
                        <StartButton title={t('tap_to_earn')} tip={`${t('start_in')} (60 SEC)`} action={handlePending} active={true} />
                        :
                        <StartButton title={`1/100 ${t('gamers')}`} subTitle={t('be_careful')} action={() => toggleDialog('end')} />
                    )
                }
            </div>
        </BasicDialog>
    )
}

export default RuleDialog
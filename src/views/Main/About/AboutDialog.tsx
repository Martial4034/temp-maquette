import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import BasicDialog from "../../../components/BasicDialog"
import { useAppContext } from "../../../contexts/AppContext";
import InfoItem from "./InfoItem";

const AboutDialog = () => {
    const { t } = useTranslation();
    const { showDialog } = useAppContext()

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!showDialog) {
        return null
    }

    return (
        <BasicDialog>
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="-ml-12 flex w-1/2 items-center justify-center">
                    <img src={`/images/ox_${currentIndex + 1}.png`} alt="ox" className="size-40 lg:size-64" />
                </div>
                <div className="flex w-1/2 items-center justify-center">
                    <InfoItem>
                        <div className="text-xl lg:text-3xl">{t("q_1")}</div>
                        <div className="mt-0 lg:mt-2 text-sm lg:text-lg">{t("a_1")}</div>
                        <div className="mt-2 lg:mt-6 text-xl lg:text-3xl">{t("q_2")}</div>
                        <div className="mt-0 lg:mt-2 text-sm lg:text-lg">{t("a_2_1")}</div>
                        <div className="mt-0 lg:mt-2 text-sm lg:text-lg">{t("a_2_2")}</div>
                    </InfoItem>
                </div>
            </div>
        </BasicDialog>
    )
}

export default AboutDialog
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import WebApp from "@twa-dev/sdk";

import BasicDialog from "../../../components/BasicDialog"
import { useAppContext } from "../../../contexts/AppContext";
import { getHourRemaining } from "../../../utils/Normal";

import QuestItem, { Quest } from "./QuestItem";
import MenuItem from "./MenuItem";

const dailyQuests: Quest[] = [
    { id: 1, description: "Win 3 games", goal: 3, currentProgress: 1, oxReward: 50, completed: false, date: "2025-01-23" },
    { id: 2, description: "Invite 2 friends", goal: 2, currentProgress: 0, oxReward: 100, completed: false, date: "2025-01-23" },
    { id: 3, description: "Play 10 matches", goal: 10, currentProgress: 10, oxReward: 150, completed: true, date: "2025-01-23" },
    { id: 4, description: "Complete 2 daily quests", goal: 2, currentProgress: 0, oxReward: 40, completed: false, date: "2025-01-26" },
    { id: 5, description: "Reach level 10", goal: 10, currentProgress: 6, oxReward: 100, completed: false, date: "2025-01-27" },
    { id: 6, description: "Defeat the boss 3 times", goal: 3, currentProgress: 2, oxReward: 75, completed: false, date: "2025-01-28" }
];

const perpetualQuests: Quest[] = [
    { id: 101, description: "Win 50 games", goal: 50, currentProgress: 12, oxReward: 500, completed: false },
    { id: 102, description: "Earn 1000 OX", goal: 1000, currentProgress: 400, oxReward: 750, completed: false },
];

const QuestDialog = () => {
    const { t } = useTranslation();
    const { showDialog } = useAppContext()
    const [type, setType] = useState('daily');
    const [scrollEnd, setScrollEnd] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false);

    const quests = type === "daily" ? dailyQuests : perpetualQuests;

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;

            if (scrollTop + clientHeight >= scrollHeight) {
                setScrollEnd(true)
            } else {
                setScrollEnd(false)
            }
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            setIsOverflowing(scrollHeight > clientHeight);
        }
    }, []);

    const handleSelectType = (type: string) => {
        setType(type)
        vibrate()
    }

    const vibrate = () => {
        WebApp.HapticFeedback.impactOccurred('medium')
    }

    if (!showDialog) {
        return null
    }

    return (
        <BasicDialog>
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="flex h-full w-full flex-col items-center justify-center mt-4 lg:mt-8 gap-2 lg:gap-4">
                    <div className="flex w-full items-center justify-between gap-2 lg:gap-4">
                        <MenuItem title={t("daily_quest")} subTitle={`${t("end_in")} ${getHourRemaining()}`} action={() => handleSelectType('daily')} active={type === 'daily'} />
                        <MenuItem title={t("quests")} action={() => handleSelectType('perpetual')} active={type === 'perpetual'} />
                    </div>
                    <div className="w-full flex flex-col gap-1 lg:gap-2 h-[168px] lg:h-[360px] overflow-y-auto overflow-hidden" onScroll={handleScroll} ref={scrollContainerRef} >
                        {quests.map((quest, index) => {
                            return (
                                <QuestItem quest={quest} key={index} />
                            )
                        })}
                    </div>
                </div>
                {((isOverflowing && !scrollEnd) || (!isOverflowing && scrollEnd)) && <div className="absolute -bottom-4 lg:-bottom-6 cursor-pointer size-fit rounded-full border lg:border-2 border-[#F0E749] z-40 p-[1px] lg:p-0.5" >
                    <div className="background rounded-full size-8 lg:size-12 border lg:border-2 border-[#F0E749] flex items-center justify-center text-lg lg:text-3xl">
                        <img src="/images/down_yellow.svg" alt="ox_trophy" className={`size-4 lg:size-6 transform`} />
                    </div>
                </div>}
            </div>
        </BasicDialog>
    )
}

export default QuestDialog
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import WebApp from "@twa-dev/sdk";

import BasicDialog from "../../../components/BasicDialog"
import { useAppContext } from "../../../contexts/AppContext";
import { getHourRemaining } from "../../../utils/Normal";

import QuestItem, { Quest } from "./QuestItem";
import MenuItem from "./MenuItem";

const dailyQuests: Quest[] = [
    { id: 1, description: "Log in Today", goal: 1, currentProgress: 0, oxReward: 25, completed: false, date: "2025-01-23" },
    { id: 2, description: "Partner Link", goal: 1, currentProgress: 0, oxReward: 50, completed: false, date: "2025-01-23" },
    { id: 3, description: "Get a score of 25", goal: 25, currentProgress: 0, oxReward: 25, completed: false, date: "2025-01-23" },
    { id: 4, description: "Get a score of 50", goal: 50, currentProgress: 0, oxReward: 50, completed: false, date: "2025-01-23" },
    { id: 5, description: "Play 10 games", goal: 10, currentProgress: 0, oxReward: 25, completed: false, date: "2025-01-23" },
    { id: 6, description: "Play 25 games", goal: 25, currentProgress: 0, oxReward: 50, completed: false, date: "2025-01-23" },
    { id: 7, description: "Play an Earn Game", goal: 1, currentProgress: 0, oxReward: 25, completed: false, date: "2025-01-23" },
    { id: 8, description: "Win an Earn Game", goal: 1, currentProgress: 0, oxReward: 50, completed: false, date: "2025-01-23" },
    { id: 9, description: "Invite 1 friend", goal: 1, currentProgress: 0, oxReward: 25, completed: false, date: "2025-01-23" },
    { id: 10, description: "Invite 3 friends", goal: 3, currentProgress: 0, oxReward: 50, completed: false, date: "2025-01-23" }
];

const perpetualQuests: Quest[] = [
    { id: 100, description: "Add your email", goal: 1, currentProgress: 0, oxReward: 100, completed: false },
    { id: 101, description: "Connect your wallet", goal: 1, currentProgress: 0, oxReward: 100, completed: false },
    { id: 102, description: "Join the Telegram channel", goal: 1, currentProgress: 0, oxReward: 100, completed: false },
    { id: 103, description: "Join the community", goal: 1, currentProgress: 0, oxReward: 100, completed: false },
    { id: 104, description: "Join Twitter", goal: 1, currentProgress: 0, oxReward: 100, completed: false },
    { id: 105, description: "Join Oxelta Twitter", goal: 1, currentProgress: 0, oxReward: 100, completed: false },
    { id: 106, description: "Follow X Galante", goal: 1, currentProgress: 0, oxReward: 100, completed: false },
    { id: 107, description: "Follow X Tony", goal: 1, currentProgress: 0, oxReward: 100, completed: false },
    { id: 108, description: "Telegram Premium", goal: 1, currentProgress: 0, oxReward: 100, completed: false },
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
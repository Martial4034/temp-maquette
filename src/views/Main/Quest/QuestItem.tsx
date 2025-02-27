import { useTranslation } from "react-i18next";

export type Quest = {
    id: number; // Unique identifier for the quest
    description: string; // Objective of the quest
    goal: number; // Target number to complete the quest (e.g., "Win 5 games")
    currentProgress: number; // User’s current progress
    oxReward: number; // Reward in OX
    completed: boolean; // True if the quest is completed
    date?: string; // Optional: Expiration date for daily quests
};

interface QuestItemProps {
    quest: Quest
}

const QuestItem = ({ quest }: QuestItemProps) => {
    const { t } = useTranslation()

    console.log("pooh, word = ", t(quest.description))

    return (
        <div className="w-full flex items-center justify-between">
            <div className="large-info-border1 cursor-pointer p-[1px] lg:p-0.5">
                <div className="large-info-border2 p-[1px] lg:p-0.5">
                    <div className="large-info-border3 p-[1px] lg:p-0.5">
                        <div className={`relative flex items-center justify-center large-info w-[360px] h-8 lg:w-[520px] lg:h-12 ${quest.completed ? "inactive" : ""}`}>
                            <div className="absolute w-full flex items-center justify-between text-base lg:text-2xl px-4">
                                <img src="/images/flag.png" alt="flag" className="size-5 lg:size-7" />
                                <div>{t(quest.description)}</div>
                                {quest.completed ?
                                    <img src="/images/trophy.png" alt="trophy" className="size-5 lg:size-7" />
                                    :
                                    <div>{`${quest.currentProgress}/${quest.goal}`}</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-0.5">
                <div className="h-[1px] lg:h-0.5 w-full min-w-12 lg:min-w-20 bg-[#F0E749]" />
                <div className="h-[1px] lg:h-0.5 w-full min-w-12 lg:min-w-20 bg-[#F0E749]" />
            </div>
            <div className="large-info-border1 cursor-pointer p-[1px] lg:p-0.5">
                <div className="large-info-border2 p-[1px] lg:p-0.5">
                    <div className="large-info-border3 p-[1px] lg:p-0.5">
                        <div className={`relative flex items-center justify-center large-info w-28 h-8 lg:w-40 lg:h-12 ${quest.completed ? "inactive" : ""}`}>
                            <div className="absolute w-full flex items-center justify-center gap-2 text-base lg:text-2xl px-4">
                                <div>+{quest.oxReward}</div>
                                <img src="/images/ox_1.png" alt="ox" className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestItem;
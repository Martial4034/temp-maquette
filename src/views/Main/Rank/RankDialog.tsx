import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import BasicDialog from "../../../components/BasicDialog";

import InfoItem from "./InfoItem";
import PlayerItem, { Player } from "./PlayerItem";
import { getDayRemaining } from "../../../utils/Normal";
import { useAppContext } from "../../../contexts/AppContext";

const players: Player[] = [
    { id: 1, name: "User123", bestScore: 1520, rank: 1, rewardOX: 500, isCurrentUser: true },
    { id: 2, name: "Player_02", bestScore: 1480, rank: 2, rewardOX: 450, isCurrentUser: false },
    { id: 4, name: "user5", bestScore: 1480, rank: 4, rewardOX: 450, isCurrentUser: false },
    { id: 80, name: "RandomDude", bestScore: 920, rank: 80, rewardOX: 50, isCurrentUser: false },
];

const RankDialog = () => {
    const { t } = useTranslation();
    const { showDialog } = useAppContext()
    const [scrollEnd, setScrollEnd] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false);

    const competitionEndDate = "2025-02-01";

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

    if (!showDialog) {
        return null
    }

    return (
        <BasicDialog>
            <div className="relative flex h-full w-full flex-col items-center justify-center">
                <div className="flex h-full w-full flex-col items-center justify-center mt-4 lg:mt-8 gap-2 lg:gap-4">
                    <div className="flex items-center justify-around gap-10 md:gap-16">
                        <InfoItem title={`${t("end_in")} ${getDayRemaining(competitionEndDate)}`}>
                            <img src="/images/ox_trophy.png" alt="ox_trophy" className="size-12 lg:size-24 mb-1 lg:mb-2" />
                        </InfoItem>
                        <InfoItem title={`${t("rank")}`} value={1} />
                        <InfoItem title={`${t("best_score")}`} value={101} />
                    </div>
                    <div className="w-full flex flex-col gap-1 lg:gap-2 h-[140px] lg:h-[360px] overflow-y-auto overflow-hidden" onScroll={handleScroll} ref={scrollContainerRef} >
                        {players.map((player, index) => {
                            return (
                                <PlayerItem player={player} index={index} key={index} />
                            )
                        })}
                    </div>
                </div>
                {((isOverflowing && !scrollEnd) || (!isOverflowing && scrollEnd)) && <div className="absolute -bottom-4 lg:-bottom-6 cursor-pointer size-fit rounded-full border lg:border-2 border-[#F0E749] z-40 p-[1px] lg:p-0.5">
                    <div className="background rounded-full size-8 lg:size-12 border lg:border-2 border-[#F0E749] flex items-center justify-center text-lg lg:text-3xl">
                        <img src="/images/down_yellow.svg" alt="down" className={`size-4 lg:size-6 transform`} />
                    </div>
                </div>}
            </div>
        </BasicDialog>
    );
};

export default RankDialog;

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import BasicDialog from "../../../components/BasicDialog";
import { useAppContext } from "../../../contexts/AppContext";

import InfoItem from "./InfoItem";
import PlayerItem, { Player } from "./PlayerItem";
import CupItem from "./CupItem";

const players: Player[] = [
    { name: "User123", bestScore: 1520, rank: 1, isCurrentUser: true },
    { name: "Player_02", bestScore: 1480, rank: 2, isCurrentUser: false },
    { name: "user5", bestScore: 1480, rank: 3, isCurrentUser: false },
    { name: "RandomDude", bestScore: 920, rank: 80, isCurrentUser: false },
];

const EndDialog = () => {
    const { t } = useTranslation();
    const { showDialog, betCost } = useAppContext()
    const [win, setWin] = useState(false)

    useEffect(() => {
        const filteredPlayers = players.filter(player => player.isCurrentUser === true)
        if (filteredPlayers.length) {
            const player = filteredPlayers[0]
            console.log("pooh, player = ", player)
            if (player.rank > 3) {
                setWin(false)
            } else {
                setWin(true)
            }
        }
    }, [players])

    const winPlayers = players.filter(player => player.rank < 4).sort((a, b) => a.rank - b.rank)

    if (!showDialog) {
        return null
    }

    return (
        <BasicDialog>
            <div className="relative flex h-full w-full flex-col items-center justify-center">
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-4">
                    <div className="flex items-center justify-around gap-10 md:gap-16">
                        <InfoItem>
                            <img src="/images/ox_trophy.png" alt="ox_trophy" className="size-12 lg:size-24 mb-1 lg:mb-2" />
                        </InfoItem>
                        <InfoItem>
                            <div className="text-2xl lg:text-5xl">{betCost}</div>
                        </InfoItem>
                        <InfoItem>
                            <div className="text-2xl lg:text-5xl">{win ? t('win') : t('lose')}</div>
                        </InfoItem>
                    </div>
                    {!win ?
                        <div className="w-full flex flex-col gap-1 lg:gap-2" >
                            {players.map((player, index) => {
                                return (
                                    <PlayerItem player={player} key={index} />
                                )
                            })}
                        </div>
                        :
                        <div className="w-full flex items-end justify-center gap-4 lg:gap-8 mt-2 lg:mt-4" >
                            <CupItem player={winPlayers[1]} />
                            <CupItem player={winPlayers[0]} />
                            <CupItem player={winPlayers[2]} />
                        </div>
                    }
                </div>
            </div>
        </BasicDialog>
    );
};

export default EndDialog;

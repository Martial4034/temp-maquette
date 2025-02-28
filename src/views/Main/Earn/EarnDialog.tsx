import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import WebApp from "@twa-dev/sdk";

import BasicDialog from "../../../components/BasicDialog"
import { useAppContext } from "../../../contexts/AppContext";

import ModeItem from "./ModeItem";
import EarnButton from "./EarnButton";
import CupItem from "./CupItem";

export type BetOption = 1 | 2 | 5 | 20; // Possible bet values
export type PlayerCount = 3 | 10 | 20 | 100; // Number of players

export type PrizeDistribution = {
    first: number; // Reward for 1st place
    second?: number; // Reward for 2nd place (optional)
    third?: number; // Reward for 3rd place (optional)
};

type GameMode = {
    players: PlayerCount; // Number of players
    bets: { [key in BetOption]: PrizeDistribution }; // Mapping of bets to rewards
};

const players: PlayerCount[] = [3, 10, 20, 100];
const bets: BetOption[] = [1, 2, 5, 20];

const gameModes: GameMode[] = [
    {
        players: 3,
        bets: {
            1: { first: 2 },   // 1er : 2 TON
            2: { first: 4 },
            5: { first: 10 },
            20: { first: 40 }
        }
    },
    {
        players: 10,
        bets: {
            1: { first: 5, second: 3, third: 1 },
            2: { first: 10, second: 6, third: 2 },
            5: { first: 25, second: 15, third: 5 },
            20: { first: 100, second: 60, third: 20 }
        }
    },
    {
        players: 20,
        bets: {
            1: { first: 10, second: 6, third: 2 },
            2: { first: 20, second: 12, third: 4 },
            5: { first: 50, second: 30, third: 10 },
            20: { first: 200, second: 120, third: 40 }
        }
    },
    {
        players: 100,
        bets: {
            1: { first: 50, second: 30, third: 10 },
            2: { first: 100, second: 60, third: 20 },
            5: { first: 250, second: 150, third: 50 },
            20: { first: 1000, second: 600, third: 200 }
        }
    }
];


const EarnDialog = () => {
    const { t, i18n: { language } } = useTranslation();
    const { showDialog, setMode, betType, setBetType, betPlayer, setBetPlayer, betCost, setBetCost } = useAppContext()

    useEffect(() => {
        if (betPlayer && betCost) {
            const mode = gameModes.find((mode) => mode.players === betPlayer);
            if (mode) {
                const bet = mode.bets[betCost];
                setBetType(bet)
            }
        }
    }, [betPlayer, betCost]);

    if (!showDialog) {
        return null
    }

    const handleSelectPlayerCount = (playerCount: PlayerCount) => {
        setBetPlayer(playerCount)
        vibrate()
    }

    const handleSelectBet = (bet: BetOption) => {
        setBetCost(bet)
        vibrate()
    }

    const handleBegin = () => {
        setMode('validation')
        vibrate()
    }

    const vibrate = () => {
        WebApp.HapticFeedback.impactOccurred('medium')
    }

    const isLongWord = language === 'ru' || language === 'es'

    return (
        <BasicDialog>
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-4 pt-0">
                    <div className="flex w-full items-center justify-between gap-2 lg:gap-4">
                        {players.map((player, index) => {
                            const isSelected = betPlayer === player;
                            const isInactive = betPlayer ? !isSelected : false;
                            return (
                                <ModeItem selected={isSelected} inActive={isInactive} action={() => handleSelectPlayerCount(player)} key={index}>
                                    <div className="text-xl lg:text-3xl">
                                        {player} {t("gamers")}
                                    </div>
                                </ModeItem>
                            );
                        })}
                    </div>
                    <div className="flex w-full items-center justify-between gap-2 lg:gap-4">
                        {bets.map((bet, index) => {
                            const isSelected = betCost === bet;
                            const isInactive = betCost ? !isSelected : false;
                            return (
                                <ModeItem selected={isSelected} inActive={isInactive} action={() => handleSelectBet(bet)} key={index}>
                                    <div className="text-xl lg:text-3xl">
                                        {bet} TON
                                    </div>
                                </ModeItem>
                            );
                        })}
                    </div>
                    {betType ?
                        <div className="w-full flex items-end justify-between gap-8 lg:gap-16">
                            <div className="w-1/2 flex items-end justify-center gap-2">
                                {betType.second && <CupItem index={2} reward={betType.second} />}
                                <CupItem index={1} reward={betType.first} />
                                {betType.third && <CupItem index={3} reward={betType.third} />}
                            </div>
                            <div className="w-1/2">
                                <EarnButton action={handleBegin}>
                                    <div className={`text-2xl ${isLongWord ? 'lg:text-4xl' : 'lg:text-5xl'}`}>{t("lets_begin")}</div>
                                    <div className="text-xs lg:text-xl">1/3</div>
                                </EarnButton>
                            </div>
                        </div>
                        :
                        <div className="w-full mt-4 lg:mt-8">
                            <EarnButton>
                                <div className="text-2xl lg:text-5xl">{t("choose_bet")}</div>
                            </EarnButton>
                        </div>
                    }
                </div>
            </div>
        </BasicDialog>
    )
}

export default EarnDialog
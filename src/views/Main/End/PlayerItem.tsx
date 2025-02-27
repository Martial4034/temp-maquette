import { useAppContext } from "../../../contexts/AppContext";

export type Player = {
    name: string;
    bestScore: number;
    rank: number;
    isCurrentUser: boolean;
};

interface PlayerItemProps {
    player: Player
}

const PlayerItem = ({ player }: PlayerItemProps) => {
    const { betType } = useAppContext()

    return (
        <div className="flex items-center justify-between">
            <div className="large-info-border1 cursor-pointer p-[1px] lg:p-0.5">
                <div className="large-info-border2 p-[1px] lg:p-0.5">
                    <div className="large-info-border3 p-[1px] lg:p-0.5">
                        <div className={`relative flex items-center justify-center large-info w-[360px] h-8 lg:w-[520px] lg:h-12 ${player.isCurrentUser ? "selected" : ""}`}>
                            <div className="absolute w-full flex items-center justify-between text-base lg:text-3xl px-4">
                                <div>{player.rank}</div>
                                <div>{player.name}</div>
                                <div>{player.bestScore}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`w-full flex flex-col items-center justify-center gap-0.5 ${player.rank > 3 ? 'hidden' : 'flex'}`}>
                <div className="h-[1px] lg:h-0.5 w-full min-w-12 lg:min-w-20 bg-[#F0E749]" />
                <div className="h-[1px] lg:h-0.5 w-full min-w-12 lg:min-w-20 bg-[#F0E749]" />
            </div>
            <div className={`large-info-border1 cursor-pointer p-[1px] lg:p-0.5 ${player.rank > 3 ? 'hidden' : 'flex'}`}>
                <div className="large-info-border2 p-[1px] lg:p-0.5">
                    <div className="large-info-border3 p-[1px] lg:p-0.5">
                        <div className={`relative flex items-center justify-center large-info w-28 h-8 lg:w-40 lg:h-12 ${player.isCurrentUser ? "selected" : ""}`}>
                            <div className="absolute w-full flex items-center justify-center gap-2 text-base lg:text-3xl px-4">
                                {betType && <div>{player.rank === 1 ? betType?.first : player.rank === 2 ? betType?.second : betType.third}</div>}
                                <img src="/images/ox_1.png" alt="ox" className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerItem;
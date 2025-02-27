export type Player = {
    id: number; // Unique player ID
    name: string; // Player's name
    bestScore: number; // Player's highest score
    rank: number; // Player's ranking position
    rewardOX: number; // OX reward for their position
    isCurrentUser: boolean; // True if this is the logged-in user
};

interface PlayerItemProps {
    index: number
    player: Player
}

const PlayerItem = ({ index, player }: PlayerItemProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="large-info-border1 cursor-pointer p-[1px] lg:p-0.5">
                <div className="large-info-border2 p-[1px] lg:p-0.5">
                    <div className="large-info-border3 p-[1px] lg:p-0.5">
                        <div className={`relative flex items-center justify-center large-info w-[360px] h-8 lg:w-[520px] lg:h-12 ${player.isCurrentUser ? "selected" : ""}`}>
                            <div className="absolute w-full flex items-center justify-between text-base lg:text-3xl px-4">
                                <div>{index + 1}</div>
                                <div>{player.name}</div>
                                <div>{player.bestScore}</div>
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
                        <div className={`relative flex items-center justify-center large-info w-28 h-8 lg:w-40 lg:h-12 ${player.isCurrentUser ? "selected" : ""}`}>
                            <div className="absolute w-full flex items-center justify-center gap-2 text-base lg:text-3xl px-4">
                                <div>{player.rewardOX}</div>
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
import WebApp from "@twa-dev/sdk";

import { useAppContext } from "../../../contexts/AppContext";
import { Player } from "./PlayerItem";

interface CupItemProps {
    player: Player;
}

const CupItem = ({ player }: CupItemProps) => {
    const { betType } = useAppContext()

    const handleShare = async () => {
        vibrate()
        const shareData = { text: 'asdfsdf', url: 'url' }
        if (navigator.share) {
            navigator.share(shareData).catch((err) => console.error("Error sharing", err));
        } else {
            navigator.clipboard.writeText(shareData.url);
            alert("Link copied! Share it with your friends.");
        }
    };

    const vibrate = () => {
        WebApp.HapticFeedback.impactOccurred('medium')
    }

    if ((!betType?.second && player.rank === 2) || (!betType?.third && player.rank === 3)) {
        return null
    }

    return (
        <div className="w-1/3 flex flex-col items-center">
            <div className="size-fit rounded-full border lg:border-2 border-[#F0E749] z-40 p-[1px] lg:p-0.5">
                <div className="background rounded-full size-8 lg:size-12 border lg:border-2 border-[#F0E749] flex items-center justify-center text-xl lg:text-3xl">
                    {player.rank}
                </div>
            </div>
            <div className="w-full short-info-border1 cursor-pointer p-[1px] lg:p-0.5 -mt-3 lg:-mt-6">
                <div className="short-info-border2 p-[1px] lg:p-0.5">
                    <div className="short-info-border3 p-[1px] lg:p-0.5">
                        <div className={`relative flex short-info w-full ${player.rank == 1 ? 'h-32 lg:h-56' : player.rank == 2 ? 'h-20 lg:h-36' : 'h-16 lg:h-28'} ${player.isCurrentUser ? 'selected' : ''}`}>
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center p-4 lg:p-8 text-4xl lg:text-[64px]">
                                {betType && (player.rank == 1 ? betType.first : player.rank == 2 ? betType.second : betType.third)}$
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`size-fit rounded-full border lg:border-2 border-[#F0E749] z-40 p-[1px] lg:p-0.5 -mt-4 -mb-4 lg:-mt-6 lg:-mb-8 cursor-pointer ${player.isCurrentUser ? 'flex' : 'hidden'}`} onClick={handleShare}>
                <div className="background rounded-full size-8 lg:size-12 border lg:border-2 border-[#F0E749] flex items-center justify-center text-xl lg:text-3xl">
                    <img src="/images/invite.png" alt="invite" className="size-4 lg:size-6" />
                </div>
            </div>
        </div>
    );
}

export default CupItem;
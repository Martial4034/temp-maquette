import { useTranslation } from "react-i18next";
import Menu from "../../layouts/Menus";

const EndGame = () => {
    const { t } = useTranslation();

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-between p-4">
            <Menu />
            <div className="relative flex h-[calc(100vh-70px)] w-[calc(100%-160px)] min-w-[720px] flex-col items-center justify-between rounded-lg border border-[#ffffff40] bg-[#000000b0] p-4 pt-8">
                <div className="absolute right-4 top-3 cursor-pointer border border-[#FFFFFF80] p-1">
                    <img src="/images/main/close.svg" alt="close" className="h-4 w-4" />
                </div>
                <div className="flex">
                    <div className="flex flex-col gap-1">
                        <div style={{ backgroundImage: `url(/images/main/rank.png)`, backgroundSize: "100% 100%" }} className="flex h-[52px] w-[254px] cursor-pointer items-center justify-center gap-1 px-6" >
                            <div className="text-xl">{t("ranked")} 90/100</div>
                        </div>
                        <div style={{ backgroundImage: `url(/images/main/best_score.png)`, backgroundSize: "100% 100%" }} className="flex h-[52px] w-[254px] cursor-pointer items-center justify-center gap-1 px-6" >
                            <div className="text-xl">{t("best_score")} : 100</div>
                        </div>
                    </div>
                    <div className="-mx-6 flex flex-col items-center">
                        <div style={{ backgroundImage: `url(/images/main/round_score.png)`, backgroundSize: "100% 100%" }} className="flex h-[106px] w-[202px] cursor-pointer items-center justify-center gap-1 px-6" >
                            <div className="text-[72px]">10</div>
                        </div>
                        <img src="/images/main/invitation.png" alt="bird" className="-mt-4 h-8 w-8" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div style={{ backgroundImage: `url(/images/main/total_ox.png)`, backgroundSize: "100% 100%" }} className="flex h-[52px] w-[254px] cursor-pointer items-center justify-center gap-1 px-6" >
                            <div className="text-2xl">1 000 000</div>
                            <img src="/images/main/ox_1.png" alt="bird" className="h-6 w-6" />
                        </div>
                        <div style={{ backgroundImage: `url(/images/main/add_ox.png)`, backgroundSize: "100% 100%" }} className="flex h-[52px] w-[254px] cursor-pointer items-center justify-center gap-1 px-6" >
                            <div className="text-2xl">+ 10</div>
                            <img src="/images/main/ox_1.png" alt="bird" className="h-6 w-6" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <div style={{ backgroundImage: `url(/images/main/rank_bg_selected.png)`, backgroundSize: "100% 100%" }} className="flex h-[44px] w-[654px] cursor-pointer items-center justify-between gap-1 px-8" >
                        <div>1</div>
                        <div>player profile name</div>
                        <div>101</div>
                    </div>
                    <div style={{ backgroundImage: `url(/images/main/rank_bg.png)`, backgroundSize: "100% 100%" }} className="flex h-[44px] w-[654px] cursor-pointer items-center justify-between gap-1 px-8" >
                        <div>2</div>
                        <div>player profile name</div>
                        <div>90</div>
                    </div>
                    <div style={{ backgroundImage: `url(/images/main/rank_bg.png)`, backgroundSize: "100% 100%", }} className="flex h-[44px] w-[654px] cursor-pointer items-center justify-between gap-1 px-8" >
                        <div>3</div>
                        <div>player profile name</div>
                        <div>75</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EndGame;

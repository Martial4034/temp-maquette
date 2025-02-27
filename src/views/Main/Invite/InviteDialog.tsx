import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import WebApp from "@twa-dev/sdk";

import BasicDialog from "../../../components/BasicDialog"
import { useAppContext } from "../../../contexts/AppContext";

import ButtonItem from "./ButtonItem";
import InviteItem from "./InviteItem";
import WideItem from "./WideItem";
import { copyToClipboard } from "../../../utils/Normal";
import ReferralItem from "./ReferralItem";

const ReferralTiers = [
    {
        count: 1,
        bonus: 25,
    },
    {
        count: 3,
        bonus: 50,
    },
    {
        count: 5,
        bonus: 100,
    },
    {
        count: 10,
        bonus: 200,
    },
    {
        count: 20,
        bonus: 500,
    },
    {
        count: 30,
        bonus: 100,
    },
];

const ReferralList = [
    {
        bestScore: 102,
        name: "player profile name",
        oxCount: 100000,
    },
    {
        bestScore: 105,
        name: "player profile name",
        oxCount: 1030000,
    },
    {
        bestScore: 101,
        name: "player profile name",
        oxCount: 1000,
    },
    {
        bestScore: 108,
        name: "player profile name",
        oxCount: 120000,
    },
    {
        bestScore: 100,
        name: "player profile name",
        oxCount: 120000,
    },
];

const UserReferralLink = 'https://t.me/flappyoxobot/startapp=te323'

const InviteDialog = () => {
    const { t } = useTranslation();
    const { showDialog, mode, setMode } = useAppContext()

    const referralCount = 4

    const handleClipboard = () => {
        console.log('copy')
        vibrate()
        toast("Copied Link", {
            progressClassName: '',
            className: 'custom-toast'
        });
    }

    const toggleDialog = (newMode: string) => {
        setMode(newMode);
        vibrate()
    };

    const handleInvite = () => {
        vibrate()
        const encodedMessage = encodeURIComponent(UserReferralLink)
        const telegramUrl = `https://t.me/share/url?url=${encodedMessage}`;
        window.location.href = telegramUrl;
    }

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

    if (!showDialog) {
        return null
    }

    return (
        <BasicDialog>
            <div className="relative flex flex-col h-full w-full items-center justify-center">
                <div className={`flex flex-col w-full gap-2 lg:gap-4 ${mode === 'invite' ? 'flex' : 'hidden'}`}>
                    <div className="flex w-full items-center justify-between gap-2">
                        <InviteItem action={handleInvite}>
                            <div className="flex gap-2 lg:gap-4 items-center">
                                <img src="/images/invite.png" alt="invite" className="h-8 w-6 lg:h-12 lg:w-9" />
                                <div className="text-3xl lg:text-5xl">{t("invite")}</div>
                            </div>
                        </InviteItem>
                        <ButtonItem action={handleShare}>
                            <img src="/images/share.svg" alt="share" className="size-8 lg:size-16" />
                        </ButtonItem>
                        <ButtonItem action={() => toggleDialog('referrals')}>
                            <img src="/images/amis.png" alt="amis" className="h-9 w-12 lg:h-16 lg:w-20" />
                        </ButtonItem>
                    </div>
                    <WideItem>
                        <div className="w-full flex items-center justify-between gap-2" onClick={handleClipboard} >
                            <div className="text-sm lg:text-2xl">{t("your_referral_link")}</div>
                            <img src="/images/link.png" alt="link" className="h-5 w-5 lg:h-7 lg:w-7" />
                            <div className="max-w-72 lg:max-w-[360px] text-sm lg:text-2xl text-wrap overflow-hidden">{UserReferralLink}</div>
                            <img src="/images/copy.png" alt="copy" className="h-5 w-3 lg:h-8 lg:w-5" />
                        </div>
                    </WideItem>
                    <div className="flex w-full items-center justify-between gap-2 lg:gap-4 overflow-x-auto overflow-hidden">
                        {ReferralTiers.map((tier, index) => {
                            const prevTier = index === 0 ? { count: 0 } : ReferralTiers[index - 1]
                            const nextTier = ReferralTiers[index]
                            const selected = referralCount >= prevTier.count && referralCount < nextTier.count
                            const isComplete = referralCount > tier.count
                            return (
                                <ReferralItem key={index} selected={selected} isComplete={isComplete}>
                                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                                        <div className="text-base lg:text-2xl">{`${isComplete ? tier.count : referralCount}/${tier.count}`}</div>
                                        <div className="text-base lg:text-2xl">{t("referral")}</div>
                                        <div className="text-2xl lg:text-4xl">+{tier.bonus}</div>
                                        <img src="/images/ox_1.png" alt="invite" className="mt-2 lg:mt-4 size-6 lg:size-10" />
                                    </div>
                                </ReferralItem>
                            );
                        })}
                    </div>
                </div>
                <div className={`flex flex-col w-full gap-1 lg:gap-2 ${mode === 'referrals' ? 'flex' : 'hidden'}`}>
                    <div className="flex w-full items-center justify-between text-base lg:text-3xl px-4">
                        <div>{t("best_score")}</div>
                        <div>{t("profile_invite")}</div>
                        <div className="min-w-28 text-center">ox</div>
                    </div>
                    {ReferralList.map((referral, index) => {
                        return (
                            <WideItem key={index}>
                                <div className="w-full flex items-center justify-between text-base lg:text-3xl">
                                    <div>{referral.bestScore}</div>
                                    <div>{referral.name}</div>
                                    <div className="flex items-center gap-2">
                                        <div>{referral.oxCount}</div>
                                        <img src="/images/ox_1.png" alt="close" className="size-4 lg:size-6" />
                                    </div>
                                </div>
                            </WideItem>
                        )
                    })}
                </div>
            </div>
        </BasicDialog>
    )
}

export default InviteDialog
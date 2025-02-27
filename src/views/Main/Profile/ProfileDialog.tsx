import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClickAway } from "react-use";
import WebApp from "@twa-dev/sdk";

import BasicDialog from "../../../components/BasicDialog"
import { useAppContext } from "../../../contexts/AppContext";
import InfoItem from "./InfoItem";
import ConnectButton from "./ConnectButton";

const Languages = [
    {
        name: "english",
        code: "en",
    },
    {
        name: "spanish",
        code: "es",
    },
    {
        name: "Russian",
        code: "ru",
    },
];

const ProfileDialog = () => {
    const { t, i18n: { changeLanguage, language } } = useTranslation();
    const { showDialog, mute, setMute, user, setUser } = useAppContext()
    const [showMenu, setShowMenu] = useState(false);
    const [userData, setUserData] = useState(user);

    const dialogRef = useRef<HTMLDivElement>(null);
    useClickAway(dialogRef, () => setShowMenu(false));

    useEffect(() => {
        setUserData(user);
    }, [user])

    const handleChangeLanguage = (code: string) => {
        changeLanguage(code);
        setShowMenu(false);
        vibrate()
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, email: e.target.value });
        setUser({ ...user, email: e.target.value });
        vibrate()
    }

    const selectedLanguage = Languages.filter((lang) => lang.code === language);

    const handleLanguageMenu = () => {
        setShowMenu(true)
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
                <div className="flex w-1/2 items-center justify-center">
                    <img src="/images/bird.svg" alt="bird" className="h-[129px] w-[184px] lg:h-[240px] lg:w-[320px]" />
                </div>
                <div className="flex w-1/2 flex-col gap-1 lg:gap-2">
                    <InfoItem>
                        <div className="text-xl lg:text-3xl">{userData.username}</div>
                    </InfoItem>
                    <InfoItem>
                        <input className="text-xl lg:text-3xl text-center bg-transparent outline-none" value={userData.email} onChange={handleChangeEmail} />
                    </InfoItem>
                    <div className="flex justify-between gap-1 lg:gap-2">
                        <InfoItem>
                            <div className="flex items-center justify-center gap-1">
                                <div className="text-xl lg:text-3xl">{userData.oxBalance}</div>
                                <img src="/images/ox_1.png" alt="bird" className="size-6 lg:size-8" />
                            </div>
                        </InfoItem>
                        <InfoItem>
                            <div className="text-xl lg:text-3xl">{userData.bestScore}</div>
                        </InfoItem>
                    </div>
                    <div className="flex justify-between gap-1 lg:gap-2">
                        <div className="relative w-1/2">
                            <InfoItem>
                                <div onClick={handleLanguageMenu} className="flex items-center justify-between gap-2 lg:gap-4 cursor-pointer">
                                    <div className="text-xl lg:text-3xl">{selectedLanguage[0].name}</div>
                                    <img src="/images/down.svg" alt="down" className="w-3 lg:w-5" />
                                </div>
                            </InfoItem>
                            <div className={`absolute right-8 lg:right-14 top-10 lg:top-16 z-10 flex w-max flex-col gap-0.5 rounded-lg bg-[#4e1d3d] p-1 px-3 transition-opacity ${showMenu ? "opacity-100" : "pointer-events-none opacity-0"}`} ref={dialogRef} >
                                {Languages.map((language, index) => {
                                    return (
                                        <div className="cursor-pointer text-xl lg:text-3xl" key={index} onClick={() => handleChangeLanguage(language.code)} >
                                            {language.name}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-1/2">
                            <InfoItem>
                                <div className="flex items-center justify-between gap-2 lg:gap-4 cursor-pointer" onClick={() => setMute(!mute)}>
                                    <div className="text-xl lg:text-3xl">{t("sound")}</div>
                                    <img src={`/images/${mute ? 'mute' : 'unmute'}.svg`} alt="sound" className="size-5 lg:size-8" />
                                </div>
                            </InfoItem>
                        </div>
                    </div>
                    <ConnectButton />
                </div>
            </div>
        </BasicDialog >
    )
}

export default ProfileDialog
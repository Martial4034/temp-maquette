import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { BetOption, PlayerCount, PrizeDistribution } from "../views/Main/Earn/EarnDialog";

interface User {
    username: string;
    email: string;
    oxBalance: number;
    bestScore: number;
    language: string;
    soundEnabled: boolean;
    walletLinked: boolean;
}

interface AppProps {
    isLoaded: boolean;
    setIsLoaded: Dispatch<SetStateAction<boolean>>;
    mode: string;
    setMode: Dispatch<SetStateAction<string>>;
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
    mute: boolean;
    setMute: Dispatch<SetStateAction<boolean>>;
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    walletModalStaus: string;
    setWalletModalStatus: Dispatch<SetStateAction<string>>;
    betType: PrizeDistribution | null;
    setBetType: Dispatch<SetStateAction<PrizeDistribution | null>>;
    betPlayer: PlayerCount,
    setBetPlayer: Dispatch<SetStateAction<PlayerCount>>;
    betCost: BetOption,
    setBetCost: Dispatch<SetStateAction<BetOption>>;
}

const InitialUserData = {
    username: "Beta Player", // 1 - Username displayed as static text.
    email: "youremail@tanks.io", // 2 - Input field with a default placeholder (modifiable by the user).
    oxBalance: 99999, // 3 - Amount of OX the user owns.
    bestScore: 999, // 4 - User's highest recorded score.
    language: "en", // 5 - Selected language (OK, no changes needed).
    soundEnabled: true, // 6 - Sound button (true = enabled, false = disabled).
    walletLinked: false, // 7 - Wallet link status (false = not linked, true = linked).
};

export const AppContext = createContext<AppProps>({
    isLoaded: false,
    setIsLoaded: () => { },
    mode: '',
    setMode: () => { },
    showDialog: false,
    setShowDialog: () => { },
    mute: false,
    setMute: () => { },
    user: InitialUserData,
    setUser: () => { },
    walletModalStaus: '',
    setWalletModalStatus: () => { },
    betType: null,
    setBetType: () => { },
    betPlayer: 3,
    setBetPlayer: () => { },
    betCost: 5,
    setBetCost: () => { },
});

export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mode, setMode] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [mute, setMute] = useState(false);
    const [user, setUser] = useState(InitialUserData)
    const [walletModalStaus, setWalletModalStatus] = useState('')
    const [betType, setBetType] = useState<PrizeDistribution | null>(null);
    const [betPlayer, setBetPlayer] = useState<PlayerCount>(3);
    const [betCost, setBetCost] = useState<BetOption>(5);

    return (
        <AppContext.Provider value={{ isLoaded, setIsLoaded, mode, setMode, showDialog, setShowDialog, mute, setMute, user, setUser, walletModalStaus, setWalletModalStatus, betType, setBetType, betPlayer, setBetPlayer, betCost, setBetCost }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

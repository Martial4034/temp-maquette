import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'react-use';

import MainButton from '../../components/Buttons/MainButton';
import MenuButton from '../../components/Buttons/MenuButton';
import { useAppContext } from '../../contexts/AppContext';

import useBackButton from '../../packages/mini-app/components/BackButton/useBackButton';
import AboutDialog from './About/AboutDialog';
import EarnDialog from './Earn/EarnDialog';
import EndDialog from './End/EndDialog';
import Game from './Game/Game';
import InviteDialog from './Invite/InviteDialog';
import ProfileDialog from './Profile/ProfileDialog';
import QuestDialog from './Quest/QuestDialog';
import RankDialog from './Rank/RankDialog';
import RuleDialog from './Rule/RuleDialog';
import ValidationDialog from './Validataion/ValidationDialog';
import { AnimatePresence, motion } from 'framer-motion';

const Main = () => {
    const { t } = useTranslation();
    const { isLoaded, setIsLoaded, showDialog, setShowDialog, mode, setMode, user } = useAppContext();
    const { width, height } = useWindowSize();
    const [gameVisible, setGameVisible] = useState(false);

    const [isSplashVisible, setIsSplashVisible] = useState(false);

    const isNeedRotate = width < height;

    const toggleDialog = (mode: string) => {
        setShowDialog(true);
        setMode(mode);
        vibrate();
    };

    const vibrate = () => {
        WebApp.HapticFeedback.impactOccurred('medium');
    };

    useEffect(() => {
        if (!isNeedRotate && !isLoaded) {
            setIsSplashVisible(true);
        }
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
            setIsLoaded(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isNeedRotate]);

    useBackButton({
        isBackable: gameVisible,
        onClick: () => {
            setGameVisible(false);
        },
    });

    if (isNeedRotate) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-[#000000b0] text-center">
                <img src="/images/rotate.png" alt="rotete" className="h-16 w-16" />
                <h1 className="text-stroke cursor-pointer text-2xl drop-shadow-[0px_0px_15px_#E84CD7]">
                    Please rotate your screen to landscape
                </h1>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <Game visible={!isSplashVisible} open={gameVisible} onClose={() => setGameVisible(false)}>
                <motion.div
                    animate={{
                        opacity: isSplashVisible ? 0 : 1,
                    }}
                    onClick={() => {
                        setGameVisible(true);
                    }}
                    className={`relative h-screen w-full flex-col items-center justify-center ${showDialog ? 'hidden' : 'flex'}`}
                >
                    <motion.div
                        className="fixed top-3 flex w-full items-center justify-between px-28 lg:px-64"
                        animate={{
                            top: gameVisible ? -600 : 0,
                        }}
                    >
                        <MenuButton title={user.username} action={() => toggleDialog('profile')}>
                            <img src="/images/bird.svg" alt="bird" className="h-[18px] w-5 lg:h-6 lg:w-7" />
                        </MenuButton>

                        <MenuButton
                            title={user.oxBalance.toString()}
                            position="right"
                            flipped
                            action={() => toggleDialog('about')}
                        >
                            <img src="/images/ox_1.png" alt="ox" className="size-5 lg:size-7" />
                        </MenuButton>
                    </motion.div>
                    <motion.div
                        className="fixed bottom-6 left-6 flex flex-col gap-4 lg:bottom-12 lg:left-12"
                        animate={{
                            left: gameVisible ? -600 : '1.5rem',
                        }}
                    >
                        <MainButton title="invite" action={() => toggleDialog('invite')} />
                        <MainButton title="quest" size="large" position="right" action={() => toggleDialog('quest')}>
                            <img src="/images/quest.png" alt="quest" className="size-8 lg:size-11" />
                        </MainButton>
                    </motion.div>
                    <motion.div
                        className="fixed bottom-6 flex flex-col items-end gap-4 lg:bottom-12 lg:right-12"
                        animate={{
                            right: gameVisible ? -600 : '1.5rem',
                        }}
                    >
                        <MainButton title="rank" flipped action={() => toggleDialog('rank')} />
                        <MainButton title="earn" size="large" flipped action={() => toggleDialog('earn')}>
                            <img src="/images/earn.png" alt="earn" className="size-9 lg:size-14" />
                        </MainButton>
                    </motion.div>
                    <motion.div
                        className="justify-centers flex flex-col items-center pt-48"
                        animate={{
                            marginBottom: gameVisible ? -600 : 0,
                        }}
                    >
                        <h1 className="text-stroke cursor-pointer text-[60px] drop-shadow-[0px_0px_15px_#E84CD7] lg:text-[90px]">
                            {t('tap_to_play')}
                        </h1>
                    </motion.div>
                </motion.div>
            </Game>
            {isSplashVisible ? (
                <div className="fixed left-0 top-0 z-50 flex h-screen flex-col items-center justify-center bg-[#000000b0] px-4 text-center lg:px-8">
                    <img src="/images/title.png" alt="title" />
                </div>
            ) : null}
            {/* <EndGame /> */}
            {mode === 'rank' && <RankDialog />}
            {mode === 'profile' && <ProfileDialog />}
            {mode === 'about' && <AboutDialog />}
            {(mode === 'invite' || mode === 'referrals') && <InviteDialog />}
            {mode === 'quest' && <QuestDialog />}
            {mode === 'earn' && <EarnDialog />}
            {mode === 'validation' && <ValidationDialog />}
            {mode === 'rule' && <RuleDialog />}
            {mode === 'end' && <EndDialog />}
        </AnimatePresence>
    );
};

export default Main;

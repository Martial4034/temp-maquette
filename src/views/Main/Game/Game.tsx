import { motion } from 'framer-motion';
import { FC, ReactNode, useEffect, useRef } from 'react';

type Props = {
    open: boolean;
    onClose?: VoidFunction;
    children: ReactNode;
    visible: boolean;
};

const Game: FC<Props> = ({ open, children, visible, onClose }) => {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage({ type: 'GAME_STATUS', open }, '*');
        }
    }, [open]);

    useEffect(() => {
        const handleGameMessage = (event: MessageEvent) => {
            if (event.data?.type === 'GAME_EVENT') {
                console.log('Game says:', event.data.finished);

                if (event.data.crashed) {
                    onClose?.();
                }
            }
        };

        window.addEventListener('message', handleGameMessage);

        return () => {
            window.removeEventListener('message', handleGameMessage);
        };
    }, []);

    return (
        <motion.div>
            <motion.iframe
                ref={iframeRef}
                animate={{
                    opacity: visible ? 1 : 0,
                    zIndex: open ? 22 : -1,
                }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: '100vw',
                }}
                src={`${import.meta.env.VITE_GAME_HOST_URL || 'https://flappy-oxo.vercel.app/'}`}
            />
            {children}
        </motion.div>
    );
};

export default Game;

import { ReactNode, useRef } from "react";
import { useClickAway } from "react-use";
import WebApp from "@twa-dev/sdk";

import { useAppContext } from "../contexts/AppContext";

interface BasicDialogProps {
    children?: ReactNode;
}

const BasicDialog = ({ children }: BasicDialogProps) => {
    const { mode, setMode, setShowDialog, walletModalStaus } = useAppContext();

    const dialogRef = useRef<HTMLDivElement>(null);
    useClickAway(dialogRef, () => {
        if (walletModalStaus !== 'opened') {
            setShowDialog(false)
        }
    });

    const onClose = () => {
        if (mode === 'referrals') {
            setMode('invite')
        } else if (mode === 'validation') {
            setMode('earn')
        } else {
            setShowDialog(false);
        }

        WebApp.HapticFeedback.impactOccurred('medium')
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative h-full max-h-[320px] lg:max-h-[600px] w-full max-w-[640px] lg:max-w-[940px]">
                <div className="absolute inset-0 backdrop-blur-lg bg-black bg-opacity-40 rounded-xl border border-[#ffffff40]" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 lg:px-16" ref={dialogRef}>
                    <div className="absolute right-4 top-3 cursor-pointer border border-[#FFFFFF80] p-1 z-30" onClick={onClose}>
                        <img src="/images/close.svg" alt="close" className="size-3 lg:size-6" />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BasicDialog;
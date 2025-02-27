'use client';

import { useEffect, useState } from 'react';

import { genuid, getTelegram } from '../../utils';

type BackButtonProps = {
    onClick?: () => void;
    isBackable?: boolean;
};

const useBackButton = ({ onClick, isBackable }: BackButtonProps) => {
    const [updatedBackButton, setUpdatedBackButton] = useState<string | boolean>(false);

    const Telegram = getTelegram();
    const backButton = getTelegram()?.BackButton;

    useEffect(() => {
        if (isBackable) backButton?.show();
        else backButton?.hide();
    }, [isBackable, backButton]);

    useEffect(() => {
        if (updatedBackButton) {
            Telegram?.HapticFeedback.impactOccurred('light');
            onClick?.();
        } else {
            Telegram?.BackButton?.onClick(() => setUpdatedBackButton(genuid()));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedBackButton]);

    return useBackButton;
};

export default useBackButton;

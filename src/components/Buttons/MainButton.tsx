import { MouseEventHandler, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface MainButtonProps {
    action?: () => void;
    title: string;
    flipped?: boolean;
    size?: 'small' | 'large';
    children?: ReactNode;
    position?: 'left' | 'right';
}

const MainButton = ({
    action,
    title,
    flipped = false,
    size = 'small',
    children,
    position = 'left',
}: MainButtonProps) => {
    const {
        t,
        i18n: { language },
    } = useTranslation();
    const isLongWord = language === 'ru' || language === 'es';

    const onAction: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();

        action?.();
    };

    return (
        <div
            className={`relative flex h-fit w-fit cursor-pointer items-center justify-center gap-1 px-8 lg:px-10 ${size === 'large' ? (isLongWord ? 'xl py-6 text-2xl lg:py-10 lg:text-4xl' : 'py-6 text-4xl lg:py-10 lg:text-[64px]') : isLongWord ? 'py-4 text-xl lg:py-8 lg:text-3xl' : 'py-4 text-2xl lg:py-8 lg:text-5xl'}`}
            onClick={onAction}
        >
            <div className="relative z-10 flex items-center justify-center gap-2 lg:gap-4">
                {position === 'left' && children}
                <div className="z-20">{t(title)}</div>
                {position === 'right' && children}
            </div>
            <img
                src="/images/main_button.png"
                alt="button"
                className={`absolute left-0 top-0 h-full w-full ${flipped ? 'filpped' : ''}`}
            />
        </div>
    );
};

export default MainButton;

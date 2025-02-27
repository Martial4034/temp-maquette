import { MouseEventHandler, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface MenuButtonProps {
    action?: () => void;
    title: string;
    flipped?: boolean;
    children?: ReactNode;
    position?: 'left' | 'right';
    className?: string;
}

const MenuButton = ({ className, action, title, flipped = false, children, position = 'left' }: MenuButtonProps) => {
    const { t } = useTranslation();

    const onAction: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();

        action?.();
    };

    return (
        <div
            className={classNames(
                `relative flex h-fit w-fit min-w-40 cursor-pointer items-center justify-center py-2 text-xl lg:min-w-52 lg:py-4 lg:text-2xl ${flipped ? 'px-6 pl-10' : 'px-10 pl-6'}`,
                className
            )}
            onClick={onAction}
        >
            <div className="relative z-10 flex items-center justify-center gap-2">
                {position === 'left' && children}
                <div className="z-20">{t(title)}</div>
                {position === 'right' && children}
            </div>
            <img
                src="/images/profile.png"
                alt="profile"
                className={`absolute left-0 top-0 h-full w-full ${flipped ? 'filpped' : ''}`}
            />
        </div>
    );
};

export default MenuButton;

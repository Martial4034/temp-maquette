import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface MenuItemProps {
    active?: boolean;
    action: () => void;
    title: string;
    subTitle?: string;
}

const MenuItem = ({ active = false, action, title, subTitle }: MenuItemProps) => {
    const { i18n: { language } } = useTranslation();

    const isLongWord = language === 'ru' || language === 'es'

    return (
        <div className="w-full long-info-border1 cursor-pointer p-[1px] lg:p-0.5" onClick={action}>
            <div className="long-info-border2 p-[1px] lg:p-0.5">
                <div className="long-info-border3 p-[1px] lg:p-0.5">
                    <div className={`relative flex items-center justify-center long-info w-full h-16 lg:h-24 ${active ? 'selected' : ''}`}>
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="w-full h-full flex items-center justify-center text-center">
                                <div className={`text-3xl ${isLongWord ? 'lg:text-4xl' : 'lg:text-5xl'}`}>{title}</div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-2">
                            <div className="text-xs lg:text-lg">{subTitle}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;
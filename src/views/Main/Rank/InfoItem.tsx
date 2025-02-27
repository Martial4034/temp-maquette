import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface InfoItemProps {
    title: string;
    value?: string | number;
    children?: ReactNode;
}

const InfoItem = ({ title, value, children }: InfoItemProps) => {
    const { i18n: { language } } = useTranslation();

    const isLongWord = language === 'ru' || language === 'es'

    return (
        <div className="info-border1 cursor-pointer p-[1px] lg:p-0.5">
            <div className="info-border2 p-[1px] lg:p-0.5">
                <div className="info-border3 p-[1px] lg:p-0.5">
                    <div className="relative flex items-center justify-center info w-28 h-20 lg:w-48 lg:h-40">
                        <div className="absolute flex flex-col items-center justify-center text-center">
                            {children && children}
                            <div className={`${isLongWord ? 'text-xs lg:text-lg' : 'text-sm'}`}>{title}</div>
                            {!children && <div className="text-5xl lg:text-[100px]">{value}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoItem;
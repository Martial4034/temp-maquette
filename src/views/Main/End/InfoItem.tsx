import { ReactNode } from "react";

interface InfoItemProps {
    children?: ReactNode;
}

const InfoItem = ({ children }: InfoItemProps) => {
    return (
        <div className="info-border1 cursor-pointer p-[1px] lg:p-0.5">
            <div className="info-border2 p-[1px] lg:p-0.5">
                <div className="info-border3 p-[1px] lg:p-0.5">
                    <div className="relative flex items-center justify-center info w-28 h-20 lg:w-48 lg:h-40">
                        <div className="absolute flex flex-col items-center justify-center">
                            {children && children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoItem;
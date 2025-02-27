import { ReactNode } from "react";

interface InfoItemProps {
    children?: ReactNode;
}

const InfoItem = ({ children }: InfoItemProps) => {
    return (
        <div className="w-full long-info-border1 cursor-pointer p-[1px] lg:p-0.5">
            <div className="long-info-border2 p-[1px] lg:p-0.5">
                <div className="long-info-border3 p-[1px] lg:p-0.5">
                    <div className="relative flex items-center justify-center long-info w-full h-9 lg:h-16">
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
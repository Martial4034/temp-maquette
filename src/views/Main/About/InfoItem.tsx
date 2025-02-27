import { ReactNode } from "react";

interface InfoItemProps {
    children?: ReactNode;
}

const InfoItem = ({ children }: InfoItemProps) => {
    return (
        <div className="w-full short-info-border1 cursor-pointer p-[1px] lg:p-0.5">
            <div className="short-info-border2 p-[1px] lg:p-0.5">
                <div className="short-info-border3 p-[1px] lg:p-0.5">
                    <div className="relative flex items-center justify-center short-info w-full h-64 lg:h-96">
                        <div className="absolute flex flex-col items-center justify-center text-center p-4 lg:p-8">
                            {children && children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoItem;
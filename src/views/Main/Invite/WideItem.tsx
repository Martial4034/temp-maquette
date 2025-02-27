import { ReactNode } from "react";

interface WideItemProps {
    children?: ReactNode;
}

const WideItem = ({ children }: WideItemProps) => {
    return (
        <div className="w-full large-info-border1 cursor-pointer p-[1px] lg:p-0.5">
            <div className="large-info-border2 p-[1px] lg:p-0.5">
                <div className="large-info-border3 p-[1px] lg:p-0.5">
                    <div className="relative flex items-center justify-center large-info lg:min-w-[540px] h-10 lg:h-14">
                        <div className="w-full absolute flex flex-col items-center justify-center px-4 lg:px-8">
                            {children && children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WideItem;
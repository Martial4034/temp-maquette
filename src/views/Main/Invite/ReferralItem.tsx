import { ReactNode } from "react";

interface ReferralItemProps {
    children?: ReactNode;
    selected?: boolean;
    isComplete?: boolean;
}

const ReferralItem = ({ children, selected = false, isComplete = false }: ReferralItemProps) => {

    return (
        <div className="short-info-border1 cursor-pointer p-[1px] lg:p-0.5">
            <div className="short-info-border2 p-[1px] lg:p-0.5">
                <div className="short-info-border3 p-[1px] lg:p-0.5">
                    <div className={`relative flex items-center justify-center short-info w-28 lg:w-40 h-32 lg:h-48 ${selected ? "" : "unselected"}`}>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                            {children && children}
                        </div>
                        {isComplete &&
                            <div className="absolute top-0 left-0 w-full h-full bg-[#44484ba0] text-xs lg:text-base flex items-center justify-center">
                                <img src="/images/trophy.png" alt="invite" className="size-10 lg:size-16" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferralItem;
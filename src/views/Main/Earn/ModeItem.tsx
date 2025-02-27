import { ReactNode } from "react";

interface ModeItemProps {
    children?: ReactNode;
    selected?: boolean;
    inActive?: boolean;
    action: () => void;
}

const ModeItem = ({ children, selected = false, inActive = false, action }: ModeItemProps) => {

    return (
        <div className="short-info-border1 cursor-pointer p-[1px] lg:p-0.5" onClick={action}>
            <div className="short-info-border2 p-[1px] lg:p-0.5">
                <div className="short-info-border3 p-[1px] lg:p-0.5">
                    <div className={`relative flex items-center justify-center short-info w-28 lg:w-40 h-16 lg:h-32 ${selected ? "selected" : ""} ${inActive ? "inactive" : ""}`}>
                        <div className="absolute flex flex-col items-center justify-center text-center px-4">
                            {children && children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModeItem;
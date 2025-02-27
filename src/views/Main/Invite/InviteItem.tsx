import { ReactNode } from "react";

interface InviteItemProps {
    children?: ReactNode;
    action?: () => void;
}

const InviteItem = ({ children, action }: InviteItemProps) => {
    return (
        <div className="w-full long-info-border1 cursor-pointer p-[1px] lg:p-0.5" onClick={action}>
            <div className="long-info-border2 p-[1px] lg:p-0.5">
                <div className="long-info-border3 p-[1px] lg:p-0.5">
                    <div className="relative flex items-center justify-center long-info min-w-72 lg:min-w-80 h-16 lg:h-24">
                        <div className="absolute flex flex-col items-center justify-center">
                            {children && children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InviteItem;
import { ReactNode } from "react";

interface ButtonItemProps {
    children?: ReactNode;
    action?: () => void;
}

const ButtonItem = ({ children, action }: ButtonItemProps) => {
    return (
        <div className="short-info-border1 cursor-pointer p-[1px] lg:p-0.5" onClick={action}>
            <div className="short-info-border2 p-[1px] lg:p-0.5">
                <div className="short-info-border3 p-[1px] lg:p-0.5">
                    <div className="relative flex items-center justify-center short-info w-20 h-16 lg:w-32 lg:h-24">
                        <div className="absolute flex flex-col items-center justify-center text-center p-4 lg:p-6">
                            {children && children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ButtonItem;
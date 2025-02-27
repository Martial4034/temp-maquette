interface EarnButtonProps {
    action?: () => void
    title: string
    subTitle: string
}

const EarnButton = ({ title, subTitle, action }: EarnButtonProps) => {

    return (
        <div className="w-full long-info-border1 cursor-pointer p-[1px] lg:p-0.5" onClick={action} >
            <div className="long-info-border2 p-[1px] lg:p-0.5">
                <div className="long-info-border3 p-[1px] lg:p-0.5">
                    <div className="relative flex items-center justify-center long-info selected w-full h-16 lg:h-24">
                        <div className="absolute flex flex-col items-center justify-center">
                            <div className="text-3xl lg:text-5xl">{title}</div>
                        </div>
                        <div className="absolute bottom-0.5 text-xs lg:text-lg">{subTitle}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EarnButton;
interface StartButtonProps {
    action?: () => void
    title: string
    subTitle?: string
    tip?: string
    active?: boolean
}

const StartButton = ({ action, title, subTitle, tip, active }: StartButtonProps) => {
    return (
        <div className="short-info-border1 cursor-pointer p-[1px] lg:p-0.5" onClick={action}>
            <div className="short-info-border2 p-[1px] lg:p-0.5">
                <div className="short-info-border3 p-[1px] lg:p-0.5">
                    <div className={`relative flex items-center justify-center short-info w-72 lg:w-[440px] h-40 lg:h-80 ${active ? 'selected' : ''}`}>
                        <div className="absolute flex flex-col items-center justify-center text-center p-2 lg:p-4">
                            <div className="text-3xl lg:text-5xl">{title}</div>
                            {subTitle && <div>{subTitle}</div>}
                        </div>
                        {tip && <div className="absolute bottom-1 lg:bottom-2 flex flex-col items-center justify-center text-center p-2 lg:p-4">
                            <div className="lg:text-2xl">{tip}</div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StartButton;
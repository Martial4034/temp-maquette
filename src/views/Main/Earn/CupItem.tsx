interface CupItemProps {
    index: number;
    reward: number;
}

const CupItem = ({ index, reward }: CupItemProps) => {
    return (
        <div className="w-1/3 flex flex-col items-center">
            <div className="size-fit rounded-full border lg:border-2 border-[#F0E749] z-40 p-[1px] lg:p-0.5">
                <div className="background rounded-full size-6 lg:size-10 border lg:border-2 border-[#F0E749] flex items-center justify-center text-lg lg:text-2xl">
                    {index}
                </div>
            </div>
            <div className="w-full short-info-border1 cursor-pointer p-[1px] lg:p-0.5 -mt-3 lg:-mt-6">
                <div className="short-info-border2 p-[1px] lg:p-0.5">
                    <div className="short-info-border3 p-[1px] lg:p-0.5">
                        <div className={`relative flex short-info w-full ${index == 1 ? 'h-20 lg:h-40' : index == 2 ? 'h-16 lg:h-28' : 'h-12 lg:h-20'}`}>
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center p-4 lg:p-8 text-lg lg:text-3xl">
                                {reward}$
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CupItem;
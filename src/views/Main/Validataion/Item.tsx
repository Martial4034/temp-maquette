interface ItemProps {
    action?: () => void
    title: string;
    subTitle?: string;
    disable?: boolean;
    active?: boolean;
}

const Item = ({ action, title, subTitle, disable, active }: ItemProps) => {

    return (
        <div className="w-full h-fit long-info-border1 cursor-pointer p-[1px] lg:p-0.5" onClick={action}>
            <div className="long-info-border2 p-[1px] lg:p-0.5">
                <div className="long-info-border3 p-[1px] lg:p-0.5">
                    <div className={`relative flex items-center justify-center text-center long-info w-full h-16 lg:h-24 ${disable ? 'inactive' : ''} ${active ? 'selected' : ''}`}>
                        <div className="absolute flex flex-col items-center justify-center">
                            <div className="text-xl lg:text-3xl">{title}</div>
                        </div>
                        {subTitle && (
                            <div className="absolute bottom-0.5 text-xs lg:text-lg">{subTitle}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;

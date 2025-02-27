import { useTranslation } from "react-i18next";

const Menu = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-between gap-2 px-8">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-fit cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#4B3080] px-1">
          <img src="/images/main/close.svg" alt="close" className="h-2 w-2" />
          <div className="text-xs">{t("close")}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-14 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#4B3080]">
          <img src="/images/main/down.svg" alt="down" className="w-3" />
          <img src="/images/main/more.svg" alt="more" className="w-5" />
        </div>
      </div>
    </div>
  );
};

export default Menu;

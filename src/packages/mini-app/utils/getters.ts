import Telegram, { UserDataType } from '../telegram';
import { isBrowser, isEmpty } from './helpers';

// REPLACE: DEV_INIT_DATA value with the actual initData value
const DEV_INIT_DATA = '';

export const getTelegram = (): Telegram | undefined => {
    const isDevEnv = process.env.NODE_ENV === 'development';

    return isBrowser
        ? {
              ...window?.Telegram?.WebApp,
              initData: isDevEnv ? DEV_INIT_DATA : window?.Telegram?.WebApp?.initData,
              showConfirm: isEmpty(window?.Telegram?.WebApp?.initDataUnsafe)
                  ? (message, okCallback) => {
                        const ok = confirm(message);

                        okCallback?.(ok);
                    }
                  : window?.Telegram?.WebApp?.showConfirm,
              showAlert: isEmpty(window?.Telegram?.WebApp?.initDataUnsafe)
                  ? (message) => {
                        alert(message);
                    }
                  : window?.Telegram?.WebApp?.showAlert,

              CloudStorage: window?.Telegram?.WebApp?.isVersionAtLeast('6.9')
                  ? window?.Telegram?.WebApp?.CloudStorage
                  : {
                        setItem: (
                            key: string,
                            value: string,
                            clb?: (param: null | Error, is_stored: boolean) => void
                        ) => {
                            window.localStorage.setItem(key, value);
                            clb?.(null, true);
                        },

                        getItem: (key: string, clb?: (param: null | Error, value: string) => void) => {
                            const value = window.localStorage.getItem(key);
                            clb?.(null, value as string);
                        },
                        getItems: (keys: string[], clb?: (param: null | Error, value: string[]) => void) => {
                            const value = keys.map((key) => window.localStorage.getItem(key));
                            clb?.(null, value as string[]);
                        },

                        getKeys: (clb?: (param: null | Error, value: string[]) => void) => {
                            const keys = Object.keys(window.localStorage);
                            clb?.(null, keys);
                        },

                        removeItem: (key: string, clb?: (param: null | Error, value: boolean) => void) => {
                            window.localStorage.removeItem(key);
                            clb?.(null, true);
                        },

                        removeItems: (keys: string[], clb?: (param: null | Error, removed: boolean) => void) => {
                            keys.forEach((key) => window.localStorage.removeItem(key));
                            clb?.(null, true);
                        },
                    },
          }
        : undefined;
};

export const getTgUser = (): UserDataType | undefined => {
    const Telegram = getTelegram();

    if (Telegram) {
        const tgQuery = window?.Telegram?.Utils?.urlParseQueryString(Telegram?.initData) as unknown as UserDataType;

        return {
            query_id: tgQuery?.query_id,
            user:
                process.env.NODE_ENV === 'production'
                    ? JSON.parse((tgQuery?.user as unknown as string) || '{}')
                    : {
                          id: '1839588386',
                      },

            auth_date: tgQuery?.auth_date,
            hash: tgQuery?.hash,
        };
    }

    return undefined;
};

export const getMainButton = () => {
    const Telegram = getTelegram();
    return Telegram?.MainButton;
};

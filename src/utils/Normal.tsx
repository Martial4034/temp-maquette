import copy from "copy-to-clipboard";

export const getDayRemaining = (endDate: string): string => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)); // Difference in days
    return `${diff}D`;
};

export const getHourRemaining = (): string => {
    const now = new Date();
    const resetTime = new Date();
    resetTime.setHours(24, 0, 0, 0); // Reset at midnight
    const diff = Math.ceil((resetTime.getTime() - now.getTime()) / (1000 * 60 * 60)); // Difference in hours
    return `${diff}H`;
};

export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const copyToClipboard = (text: string, callback: () => void) => {
    copy(text);
    callback?.();
};

export const shortenAddress = (address: string | null | undefined, length = 6) => {
    if (!address || address.length < 10) return address;
    return `${address.substring(0, length)} ... ${address.substring(
        address.length - length,
        address.length
    )}`;
}
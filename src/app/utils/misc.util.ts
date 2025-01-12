import {format} from 'date-fns/format';

const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
export const TIME_STEP = 1 * 60 * 5;

export const generateId = (length?: number) => {
    let result = '';
    for (let i = 0; i < (length ?? 6); i++) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }

    return new Date().getTime().toString() + '_' + result;
};

export const getDuration = (time: number) => {
    const d = time;
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + 'h ' : '';
    const mDisplay = m > 0 ? m + 'm ' : '';
    const sDisplay = s + 's';
    return hDisplay + mDisplay + sDisplay;
};

export const getDateTime = (date: Date | null) => {
    if (!date) return;
    return format(new Date(date), 'dd-MM-yyyy HH:mm');
};

export const isLink = (task: string) => task.includes('https://');

export const openInNewTab = (url: string) => window.open(url, '_blank');

export const nonNullable = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined;
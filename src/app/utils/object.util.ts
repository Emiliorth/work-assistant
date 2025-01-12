import {signal} from '@angular/core';
import {InputOption} from 'src/app/interfaces/input-option.intrerface';
import {TypedObject} from 'src/app/interfaces/typed-object.interface';
import {InputOptions} from 'src/app/types/input-options.type';

export const convertArrayToObject = <T>(array: TypedObject<T>[]): TypedObject<T> => Object.assign({}, ...array);

export const convertValueToObject = <T>(value: T, key: string) => {
    return {[key]: value};
};

export const convertObjectValuesToSignals = <T>(value?: TypedObject<T>) => {
    return value !== undefined ?
        convertArrayToObject(Object.keys(value).map(entry => ({[entry]: signal(value[entry])}))) :
        value;
};

export const prepareInputOptionsFromObjects = <T extends TypedObject<any>, U>(data: T[], options: {
    labelKey: string;
    valueKey?: string;
}) => {
    const {labelKey, valueKey} = options;
    const inputOptions: InputOptions<U> = data.map((entry) => {
        const inputOption: InputOption<U> = {
            label: entry[labelKey],
            value: valueKey ? entry[valueKey] : entry
        };

        return inputOption;
    });

    return inputOptions;
};
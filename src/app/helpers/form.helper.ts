import {InputType} from 'src/app/enums/input-type.enum';

export const NON_NULLABLE_INPUT_TYPES = [
    InputType.INPUT_TEXT
];

export const INPUT_DEFAULT_VALUES = {
    [InputType.INPUT_TEXT]: '',
    [InputType.DROPDOWN]: null
}
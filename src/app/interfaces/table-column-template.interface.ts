import {DataType} from 'src/app/enums/data-type.enum';

export interface TableColumnTemplate<T> {
    field?: string;
    label?: string;
    valueGetter?: (value: T) => unknown;
    sortable?: boolean;
    dataType?: DataType;
    templateName?: string;
    actions?: boolean;
}
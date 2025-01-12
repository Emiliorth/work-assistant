import {Breakpoints} from '@angular/cdk/layout';
import {signal} from '@angular/core';
import {TypedObject} from 'src/app/interfaces/typed-object.interface';

export const DASHBOARD_COLS_MAP: TypedObject<number> = {
    [Breakpoints.XSmall]: 1,
    [Breakpoints.Small]: 1,
    [Breakpoints.Medium]: 2,
    [Breakpoints.Large]: 3,
    [Breakpoints.XLarge]: 4
};
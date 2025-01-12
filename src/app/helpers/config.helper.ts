import {Breakpoint} from 'src/app/enums/breakpoint.enum';
import {TypedObject} from 'src/app/interfaces/typed-object.interface';

export const BREAKPOINTS: TypedObject<number> = {
    [Breakpoint.XXL]: 1400,
    [Breakpoint.XL]: 1200,
    [Breakpoint.LG]: 992,
    [Breakpoint.MD]: 768,
    [Breakpoint.SM]: 576,
    [Breakpoint.XS]: 0
}
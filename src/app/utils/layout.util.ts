import {Breakpoint} from 'src/app/enums/breakpoint.enum';
import {BREAKPOINTS} from 'src/app/helpers/config.helper';

export const getBreakpoint = (width: number) => (Object.keys(BREAKPOINTS).find((key) => width >= BREAKPOINTS[key]) || Breakpoint.XS) as Breakpoint;
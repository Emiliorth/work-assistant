import {Type} from '@angular/core';
import {DashboardViewName} from 'src/app/enums/dashboard-view-name.enum';

export interface DashboardViewTemplate {
    componentName: DashboardViewName;
    component: Type<any>;
    cols?: number;
    rows?: number;
}
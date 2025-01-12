import {DashboardViewTemplate} from 'src/app/interfaces/dashboard-view-template.interface';
import {DashboardView} from 'src/app/models/dashboard-view.model';

export const mapDashboardViewToDashboardViewTemplate = (data: DashboardView) => {
    const result : Partial<DashboardViewTemplate> = {
        componentName: data.componentName,
        cols: data.colsSignal(),
        rows: data.rowsSignal()
    };

    return result;
}

export const mapDashboardViewListToDashboardViewTemplateList = (data: DashboardView[]) => {
    const result : Partial<DashboardViewTemplate>[] = data.map(entry => mapDashboardViewToDashboardViewTemplate(entry));
    return result;
}
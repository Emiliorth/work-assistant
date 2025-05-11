import {moveItemInArray} from '@angular/cdk/drag-drop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Injectable, signal, WritableSignal} from '@angular/core';
import {ProjectsComponent} from 'src/app/components/main-components/projects/projects.component';
import {WorktimeHistoryComponent} from 'src/app/components/main-components/worktime-history/worktime-history.component';
import {WorktimeComponent} from 'src/app/components/main-components/worktime/worktime.component';
import {DashboardViewName} from 'src/app/enums/dashboard-view-name.enum';
import {LocalStorageKey} from 'src/app/enums/local-storage-key.enum';
import {DASHBOARD_COLS_MAP} from 'src/app/helpers/dashboard.helper';
import {DashboardViewTemplate} from 'src/app/interfaces/dashboard-view-template.interface';
import {mapDashboardViewListToDashboardViewTemplateList} from 'src/app/mappers/dashboard.mapper';
import {DashboardView} from 'src/app/models/dashboard-view.model';
import {DashboardViewFormControl, DashboardViewFormData} from 'src/app/models/forms/dashboard-view-form.model';
import {nonNullable} from 'src/app/utils/misc.util';

@Injectable({providedIn: 'root'})
export class DashboardService {
    public colsLimitSignal: WritableSignal<number> = signal(4);
    public dashboardViewsOptions: DashboardViewTemplate[] = [
        {
            componentName: DashboardViewName.PROJECTS,
            component: ProjectsComponent
        },
        {
            componentName: DashboardViewName.WORKTIME,
            component: WorktimeComponent
        },
        {
            componentName: DashboardViewName.WORKTIME_HISTORY,
            component: WorktimeHistoryComponent
        }
    ];

    public dashboardViews: DashboardView[] = [];
    public settingsEnabled: boolean = false;

    constructor(
        private breakpointObserver: BreakpointObserver
    ) {
        this.initiate();
        this.watchForBreakpointObserver();
    }

    private initiate() {
        const dataString = localStorage.getItem(LocalStorageKey.DASHBOARD_VIEWS);
        if (!dataString) return;

        const data = JSON.parse(dataString) as {componentName: string, cols?: number, rows?: number}[];
        this.dashboardViews = data.map(entry => {
            const {componentName, cols, rows} = entry;
            const found = this.dashboardViewsOptions.find(dashboardViewOption => dashboardViewOption.componentName === componentName);
            if (!found) return;

            return new DashboardView(this.colsLimitSignal, {...found, cols, rows});
        }).filter(nonNullable);
    }

    private watchForBreakpointObserver() {
        this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge
        ]).subscribe((result) => {
            Object.keys(result.breakpoints).forEach((entry) => {
                if (result.breakpoints[entry]) this.colsLimitSignal.set(DASHBOARD_COLS_MAP[entry]);
            });
        });
    }

    public toggleSettings() {
        this.settingsEnabled = !this.settingsEnabled;
    }

    public addView(data: DashboardViewFormData) {
        const view = data[DashboardViewFormControl.VIEW];
        if (!view) return;

        this.dashboardViews.push(new DashboardView(this.colsLimitSignal, view));
        this.saveDashboardViewsToLocalStorage();
    }

    public deleteView(dashboardView: DashboardView) {
        this.dashboardViews = [...this.dashboardViews.filter(entry => entry !== dashboardView)];
        this.saveDashboardViewsToLocalStorage();
    }

    public move(index: number, destinationIndex: number) {
        if (destinationIndex < 0 || destinationIndex === this.dashboardViews.length) return;

        moveItemInArray(this.dashboardViews, index, destinationIndex);
        this.saveDashboardViewsToLocalStorage();
    }

    public saveDashboardViewsToLocalStorage() {
        const data = JSON.stringify(mapDashboardViewListToDashboardViewTemplateList(this.dashboardViews));
        localStorage.setItem(LocalStorageKey.DASHBOARD_VIEWS, data);
    }
}
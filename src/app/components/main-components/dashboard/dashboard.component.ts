import {NgComponentOutlet} from '@angular/common';
import {Component, Type} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {ButtonModule} from 'primeng/button';
import {
    DashboardTileComponent
} from 'src/app/components/main-components/dashboard/dashboard-tile/dashboard-tile.component';
import {FormComponent} from 'src/app/components/utils/form/form.component';
import {ButtonSeverity} from 'src/app/enums/button-severity.enum';
import {DashboardView} from 'src/app/models/dashboard-view.model';
import {
    DashboardViewForm,
    DashboardViewFormControl,
    DashboardViewFormData
} from 'src/app/models/forms/dashboard-view-form.model';
import {DashboardService} from 'src/app/services/dashboard.service';
import {InputsOptions} from 'src/app/types/inputs-options.type';
import {prepareInputOptionsFromObjects} from 'src/app/utils/object.util';

const COMPONENTS = [
    DashboardTileComponent,
    FormComponent
];

const PRIME_NG = [
    ButtonModule
];

const MATERIAL: (Type<any>)[] = [
    MatGridList,
    MatGridTile
];

@Component({
    selector: 'app-dashboard',
    imports: [
        NgComponentOutlet,
        ...COMPONENTS,
        ...PRIME_NG,
        ...MATERIAL
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    protected form: DashboardViewForm | null = null;
    protected inputsOptions: InputsOptions = {};

    protected readonly ButtonSeverity = ButtonSeverity;

    constructor(
        protected dashboardService: DashboardService
    ) {
    }

    protected save = () => this.dashboardService.saveDashboardViewsToLocalStorage();

    private prepareInputsOptions() {
        const data = this.dashboardService.dashboardViewsOptions.filter(entry => this.dashboardService.dashboardViews.every(dashboardView => dashboardView.componentName !== entry.componentName));
        this.inputsOptions = {
            [DashboardViewFormControl.VIEW]: prepareInputOptionsFromObjects(data, {
                labelKey: 'componentName'
            })
        };
    }

    protected toggleSettings() {
        this.dashboardService.toggleSettings();
    }

    protected move(index: number, direction: number) {
        this.dashboardService.move(index, index + direction);
    }

    protected openDialog() {
        this.prepareInputsOptions();
        this.form = new DashboardViewForm();
    }

    protected onSave($event: DashboardViewFormData) {
        this.dashboardService.addView($event);
        this.form = null;
        this.save();
    }

    protected onDelete(dashboardView: DashboardView) {
        this.dashboardService.deleteView(dashboardView);
    }
}
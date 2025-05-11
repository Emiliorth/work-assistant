import {Validators} from '@angular/forms';
import {InputType} from 'src/app/enums/input-type.enum';
import {DashboardViewTemplate} from 'src/app/interfaces/dashboard-view-template.interface';
import {DynamicForm} from 'src/app/models/forms/core/dynamic-form.model';

export enum DashboardViewFormControl {
    VIEW = 'view',
}

export interface DashboardViewFormData {
    [DashboardViewFormControl.VIEW]: DashboardViewTemplate | null;
}

export class DashboardViewForm extends DynamicForm<DashboardViewFormData> {
    constructor() {
        super();
    }

    protected prepareDefinitions() {
        this.prepareDefinitionsLogic({
            controlNames: DashboardViewFormControl,
            inputTypes: {[DashboardViewFormControl.VIEW]: InputType.DROPDOWN},
            validators: {[DashboardViewFormControl.VIEW]: [Validators.required]}
        });
    }
}
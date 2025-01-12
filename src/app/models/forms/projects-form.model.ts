import {InputType} from 'src/app/enums/input-type.enum';
import {DynamicForm} from 'src/app/models/forms/dynamic-form.model';
import {Project} from 'src/app/models/project.model';

export enum ProjectsFormControl {
    NAME = 'name'
}

export interface ProjectsFormData {
    [ProjectsFormControl.NAME]: Project | null;
}

export class ProjectsForm extends DynamicForm<ProjectsFormData> {
    constructor() {
        super();
    }

    protected prepareDefinitions() {
        this.prepareDefinitionsLogic({
            controlNames: ProjectsFormControl,
            inputTypes: {[ProjectsFormControl.NAME]: InputType.DROPDOWN},
            classes: {[ProjectsFormControl.NAME]: 'col-12'}
        });
    }
}
import {InputType} from 'src/app/enums/input-type.enum';
import {DynamicForm} from 'src/app/models/forms/core/dynamic-form.model';
import {Project} from 'src/app/models/project.model';

export enum ProjectsFormControl {
    PROJECT = 'project'
}

export interface ProjectsFormData {
    [ProjectsFormControl.PROJECT]: Project | null;
}

export class ProjectsForm extends DynamicForm<ProjectsFormData> {
    constructor() {
        super();
    }

    protected prepareDefinitions() {
        this.prepareDefinitionsLogic({
            controlNames: ProjectsFormControl,
            inputTypes: {[ProjectsFormControl.PROJECT]: InputType.DROPDOWN},
            classes: {[ProjectsFormControl.PROJECT]: 'col-12'}
        });
    }
}
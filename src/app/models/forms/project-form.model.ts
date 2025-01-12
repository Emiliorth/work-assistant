import {Validators} from '@angular/forms';
import {InputType} from 'src/app/enums/input-type.enum';
import {DynamicForm} from 'src/app/models/forms/dynamic-form.model';
import {Project} from 'src/app/models/project.model';

export enum ProjectFormControl {
    NAME = 'name',
    CREATE_PR = 'createPr',
    PR = 'pr',
    COMMITS = 'commits',
    REPOSITORY = 'repository',
    REPOSITORIES = 'repositories',
    YOUR_WORK = 'yourWork',
    FREE_TASKS = 'freeTasks',
}

export interface ProjectFormData {
    [ProjectFormControl.NAME]: string;
    [ProjectFormControl.CREATE_PR]: string;
    [ProjectFormControl.PR]: string;
    [ProjectFormControl.COMMITS]: string;
    [ProjectFormControl.REPOSITORY]: string;
    [ProjectFormControl.REPOSITORIES]: string;
    [ProjectFormControl.YOUR_WORK]: string;
    [ProjectFormControl.FREE_TASKS]: string;
}

export class ProjectForm extends DynamicForm<ProjectFormData> {
    constructor(data?: Project) {
        super();
        if (!data) return;

        this.patchValues(data, {emitEvent: false});
    }

    protected prepareDefinitions() {
        this.prepareDefinitionsLogic({
            controlNames: ProjectFormControl,
            inputTypes: {
                [ProjectFormControl.NAME]: InputType.INPUT_TEXT,
                [ProjectFormControl.CREATE_PR]: InputType.INPUT_TEXT,
                [ProjectFormControl.PR]: InputType.INPUT_TEXT,
                [ProjectFormControl.COMMITS]: InputType.INPUT_TEXT,
                [ProjectFormControl.REPOSITORY]: InputType.INPUT_TEXT,
                [ProjectFormControl.REPOSITORIES]: InputType.INPUT_TEXT,
                [ProjectFormControl.YOUR_WORK]: InputType.INPUT_TEXT,
                [ProjectFormControl.FREE_TASKS]: InputType.INPUT_TEXT
            },
            validators: {
                [ProjectFormControl.NAME]: [Validators.required]
            },
            labels: {
                [ProjectFormControl.NAME]: 'Project name',
                [ProjectFormControl.CREATE_PR]: 'Create PR URL',
                [ProjectFormControl.PR]: 'PR URL',
                [ProjectFormControl.COMMITS]: 'Commits URL',
                [ProjectFormControl.REPOSITORY]: 'Repository URL',
                [ProjectFormControl.REPOSITORIES]: 'Repositories URL',
                [ProjectFormControl.YOUR_WORK]: 'Your assigned tasks URL',
                [ProjectFormControl.FREE_TASKS]: 'Available tasks URL'
            }
        });
    }
}
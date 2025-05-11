import {Validators} from '@angular/forms';
import {InputType} from 'src/app/enums/input-type.enum';
import {DynamicForm} from 'src/app/models/forms/core/dynamic-form.model';
import {Project} from 'src/app/models/project.model';

export enum ProjectFormControl {
    NAME = 'name',
    CREATE_PR_URL = 'createPRURL',
    PR_URL = 'prURL',
    COMMITS_URL = 'commitsURL',
    REPOSITORY_URL = 'repositoryURL',
    FE_URL = 'feUrl',
    SWAGGER_URL = 'swaggerUrl'
}

export interface ProjectFormData {
    [ProjectFormControl.NAME]: string;
    [ProjectFormControl.CREATE_PR_URL]: string;
    [ProjectFormControl.PR_URL]: string;
    [ProjectFormControl.COMMITS_URL]: string;
    [ProjectFormControl.REPOSITORY_URL]: string;
    [ProjectFormControl.FE_URL]: string;
    [ProjectFormControl.SWAGGER_URL]: string;
}

export class ProjectForm extends DynamicForm<ProjectFormData> {
    constructor(data?: Project) {
        super();
        if (!data) return;

        this.patchValues(data.data, {emitEvent: false});
    }

    protected prepareDefinitions() {
        this.prepareDefinitionsLogic({
            controlNames: ProjectFormControl,
            inputTypes: {
                [ProjectFormControl.NAME]: InputType.INPUT_TEXT,
                [ProjectFormControl.CREATE_PR_URL]: InputType.INPUT_TEXT,
                [ProjectFormControl.PR_URL]: InputType.INPUT_TEXT,
                [ProjectFormControl.COMMITS_URL]: InputType.INPUT_TEXT,
                [ProjectFormControl.REPOSITORY_URL]: InputType.INPUT_TEXT,
                [ProjectFormControl.FE_URL]: InputType.INPUT_TEXT,
                [ProjectFormControl.SWAGGER_URL]: InputType.INPUT_TEXT
            },
            validators: {
                [ProjectFormControl.NAME]: [Validators.required]
            },
            labels: {
                [ProjectFormControl.NAME]: 'Project name',
                [ProjectFormControl.CREATE_PR_URL]: 'Create PR URL',
                [ProjectFormControl.PR_URL]: 'PR URL',
                [ProjectFormControl.COMMITS_URL]: 'Commits URL',
                [ProjectFormControl.REPOSITORY_URL]: 'Repository URL',
                [ProjectFormControl.FE_URL]: 'FrontEnd URL',
                [ProjectFormControl.SWAGGER_URL]: 'Swagger URL'
            }
        });
    }
}
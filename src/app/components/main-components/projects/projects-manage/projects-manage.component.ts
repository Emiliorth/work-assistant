import {NgClass} from '@angular/common';
import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormComponent} from 'src/app/components/utils/form/form.component';
import {TableComponent} from 'src/app/components/utils/table/table.component';
import {CustomTemplateDirective} from 'src/app/directives/custom-template.directive';
import {ButtonSeverity} from 'src/app/enums/button-severity.enum';
import {TABLE} from 'src/app/helpers/tables/projects.helper';
import {ProjectForm, ProjectFormData} from 'src/app/models/forms/project-form.model';
import {Project} from 'src/app/models/project.model';
import {ProjectsService} from 'src/app/services/projects.service';

const COMPONENTS = [
    TableComponent,
    FormComponent
];

const DIRECTIVES = [
    CustomTemplateDirective
];

const PRIME_NG = [
    ButtonModule
];

@Component({
    selector: 'app-projects-manage',
    imports: [
        NgClass,
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PRIME_NG
    ],
    templateUrl: './projects-manage.component.html'
})
export class ProjectsManageComponent {
    protected form: ProjectForm | null = null;

    protected readonly TABLE = TABLE;
    protected readonly ButtonSeverity = ButtonSeverity;

    constructor(
        protected projectsService: ProjectsService
    ) {
    }

    protected onCreate() {
        this.form = new ProjectForm();
    }

    protected onEdit(project: Project) {
        this.projectsService.selectedProject = project;
        this.form = new ProjectForm(project);
    }

    protected onSave($event: ProjectFormData) {
        const callback = () => this.form = null;
        this.projectsService.createProject($event, callback);
    }

    protected onUpdate($event: ProjectFormData) {
        const callback = () => this.form = null;
        this.projectsService.updateProject($event, callback);
    }

    protected onDelete(project: Project) {
        const {id} = project.data;
        if (!id) return;

        this.projectsService.deleteProject(id);
    }

    protected onCancel() {
        this.form = null;
    }
}
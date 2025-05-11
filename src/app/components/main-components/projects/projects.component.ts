import {Component, computed, OnInit, Signal} from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {Subscription} from 'rxjs';
import {
    ProjectsManageComponent
} from 'src/app/components/main-components/projects/projects-manage/projects-manage.component';
import {DialogComponent} from 'src/app/components/utils/dialog/dialog.component';
import {InputModelComponent} from 'src/app/components/utils/input-model/input-model.component';
import {AutoSubscribe} from 'src/app/decorators/auto-subscribe.decorator';
import {AutoUnsubscribe} from 'src/app/decorators/auto-unsubscribe.decorator';
import {ButtonSeverity} from 'src/app/enums/button-severity.enum';
import {InputType} from 'src/app/enums/input-type.enum';
import {ProjectsForm} from 'src/app/models/forms/projects-form.model';
import {Project} from 'src/app/models/project.model';
import {ProjectsService} from 'src/app/services/projects.service';
import {InputOptions} from 'src/app/types/input-options.type';
import {prepareInputOptionsFromObjects} from 'src/app/utils/object.util';

const COMPONENTS = [
    DialogComponent,
    InputModelComponent,
    ProjectsManageComponent
];

const PRIME_NG = [
    ButtonModule,
    AccordionModule,
    TooltipModule
];

@Component({
    selector: 'app-projects',
    imports: [
        ...COMPONENTS,
        ...PRIME_NG
    ],
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
    protected form: ProjectsForm = new ProjectsForm();
    protected inputOptionsSignal!: Signal<InputOptions<Project>>;
    protected selectedProject: Project | null = null;

    protected readonly InputType = InputType;
    protected readonly ButtonSeverity = ButtonSeverity;

    @AutoUnsubscribe private subscriptions: Subscription = new Subscription();

    constructor(
        private projectsService: ProjectsService
    ) {
    }

    public ngOnInit() {
        this.inputOptionsSignal = this.prepareInputOptions();
    }

    @AutoSubscribe
    private watchForProjects = () => {
        return this.projectsService.projects$.subscribe((value) => {
            if (!this.selectedProject) return;

            if (value.every(entry => entry.data.id !== this.selectedProject?.data.id)) this.selectedProject = null;
        });
    };

    private prepareInputOptions() {
        return computed(() => prepareInputOptionsFromObjects<Project>(this.projectsService.projectsSignal(), {labelKey: 'name'}));
    }
}
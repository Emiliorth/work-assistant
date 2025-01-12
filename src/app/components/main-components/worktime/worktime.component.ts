import {Component} from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {
    WorktimeEntryComponent
} from 'src/app/components/main-components/worktime/worktime-entry/worktime-entry.component';
import {ButtonSeverity} from 'src/app/enums/button-severity.enum';
import {WorktimeService} from 'src/app/services/worktime.service';

const COMPONENTS = [
    WorktimeEntryComponent
];

const PRIME_NG = [
    ButtonModule,
    CardModule,
    AccordionModule,
    DividerModule
];

@Component({
    selector: 'app-worktime',
    imports: [
        ...COMPONENTS,
        ...PRIME_NG
    ],
    templateUrl: './worktime.component.html'
})
export class WorktimeComponent {
    protected readonly ButtonSeverity = ButtonSeverity;

    constructor(protected worktimeService: WorktimeService) {
    }

    protected onAddWorktime() {
        this.worktimeService.addWorktime();
    }
}
import {DatePipe} from '@angular/common';
import {Component} from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {TagModule} from 'primeng/tag';
import {CustomFnPipe} from 'src/app/pipes/custom-fn.pipe';
import {WorktimeService} from 'src/app/services/worktime.service';
import {getDuration} from 'src/app/utils/misc.util';

const PIPES = [
    CustomFnPipe
];

const PRIME_NG = [
    CardModule,
    AccordionModule,
    PanelModule,
    TagModule
];

@Component({
    selector: 'app-worktime-history',
    imports: [
        DatePipe,
        ...PIPES,
        ...PRIME_NG
    ],
    templateUrl: './worktime-history.component.html'
})
export class WorktimeHistoryComponent {
    protected readonly getDuration = getDuration;

    constructor(
        protected worktimeService: WorktimeService
    ) {
    }
}
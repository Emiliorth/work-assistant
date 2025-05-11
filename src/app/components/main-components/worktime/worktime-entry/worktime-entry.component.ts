import {DatePipe, NgClass, NgStyle, NgTemplateOutlet} from '@angular/common';
import {AfterViewInit, Component, ElementRef, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TagModule} from 'primeng/tag';
import {Observable, Subscription} from 'rxjs';
import {InputModelComponent} from 'src/app/components/utils/input-model/input-model.component';
import {AutoUnsubscribe} from 'src/app/decorators/auto-unsubscribe.decorator';
import {ButtonSeverity} from 'src/app/enums/button-severity.enum';
import {InputType} from 'src/app/enums/input-type.enum';
import {PrimeNgColor} from 'src/app/enums/prime-ng-color.enum';
import {WorktimeEntryElement} from 'src/app/enums/worktime-entry-element.enum';
import {WORKTIME_ENTRY_TEMPLATES} from 'src/app/helpers/worktime.helper';
import {WorktimeEntryTemplate} from 'src/app/interfaces/worktime-entry-template.interface';
import {Worktime} from 'src/app/models/worktime.model';
import {CustomFnPipe} from 'src/app/pipes/custom-fn.pipe';
import {WorktimeService} from 'src/app/services/worktime.service';
import {getBreakpoint} from 'src/app/utils/layout.util';
import {getDuration, isLink} from 'src/app/utils/misc.util';
import {getElementWidth} from 'src/app/utils/rxjs.utils';

const COMPONENTS = [
    InputModelComponent
];

const PIPES = [
    CustomFnPipe
];

const PRIME_NG = [
    ButtonModule,
    TagModule,
    InputTextModule
];

@Component({
    selector: 'app-worktime-entry',
    imports: [
        DatePipe,
        NgStyle,
        NgClass,
        NgTemplateOutlet,
        ...COMPONENTS,
        ...PIPES,
        ...PRIME_NG
    ],
    templateUrl: './worktime-entry.component.html'
})
export class WorktimeEntryComponent implements OnInit, AfterViewInit {
    @Input({required: true}) worktime!: Worktime;

    protected templateSignal: WritableSignal<WorktimeEntryTemplate[]> = signal([]);

    protected readonly InputType = InputType;
    protected readonly getDuration = getDuration;
    protected readonly isLink = isLink;
    protected readonly PrimeNgColor = PrimeNgColor;
    protected readonly WorktimeEntryElement = WorktimeEntryElement;
    protected readonly ButtonSeverity = ButtonSeverity;

    protected hostWidth!: Observable<number>;

    @AutoUnsubscribe private subscriptions: Subscription = new Subscription();

    constructor(
        private worktimeService: WorktimeService,
        private elRef: ElementRef
    ) {
    }

    public ngOnInit() {
        this.prepareTemplate(0);
    }

    public ngAfterViewInit() {
        this.hostWidth = getElementWidth(this.elRef.nativeElement);
        this.subscriptions.add(this.watchForHostWidth());
    }

    private watchForHostWidth() {
        return this.hostWidth.subscribe(value => this.prepareTemplate(value));
    }

    private prepareTemplate(width: number) {
        this.templateSignal.set(WORKTIME_ENTRY_TEMPLATES[getBreakpoint(width)]);
    }

    protected onSubtractTime() {
        if (!this.worktime.data.task) return;

        this.worktime.subtractTime();
    }

    protected onCopyDuration() {
        if (!this.worktime.data.task) return;

        this.worktime.copyDuration();
    }

    protected onAddTime() {
        if (!this.worktime.data.task) return;

        this.worktime.addTime();
    }

    protected onHandleTimer() {
        if (!this.worktime.data.task) return;

        this.worktime.handleTimer();
    }

    protected onResetTime() {
        if (!this.worktime.data.task) return;

        this.worktime.resetTime();
    }

    protected onOpenTask() {
        if (!isLink(this.worktime.data.task)) return;

        this.worktime.openTask();
    }

    protected onMoveToHistoryAndReset() {
        if (!this.worktime.data.task || !this.worktime.data.time) return;

        this.worktimeService.addWorktimeToHistoryAndReset(this.worktime);
    }

    protected onRemoveWorktime() {
        this.worktimeService.removeWorktime(this.worktime);
    }
}
import {Injectable, signal, WritableSignal} from '@angular/core';
import {LocalStorageKey} from 'src/app/enums/local-storage-key.enum';
import {HistoricalWorktimeTemplate} from 'src/app/interfaces/historical-worktime-template.interface';
import {WorktimeTemplate} from 'src/app/interfaces/worktime-template.interface';
import {mapWorktimeToWorktimeTemplate} from 'src/app/mappers/worktime.mapper';
import {HistoricalWorktime} from 'src/app/models/historical-worktime.model';
import {Worktime} from 'src/app/models/worktime.model';
import {DialogService} from 'src/app/services/dialog.service';
import {SessionService} from 'src/app/services/session.service';
import {clearInterval, setInterval} from 'worker-timers';

@Injectable({providedIn: 'root'})
export class WorktimeService {
    public worktime: Worktime[] = [];
    public worktimeHistorySignal: WritableSignal<HistoricalWorktime[]> = signal([]);

    private saveInterval: number | null = null;

    constructor(
        private sessionService: SessionService,
        private dialogService: DialogService
    ) {
        this.initiate();
        this.initiateHistory();
    }

    public initiate() {
        const dataString = localStorage.getItem(LocalStorageKey.WORKTIME);
        if (dataString) {
            const data = JSON.parse(dataString) as WorktimeTemplate[];
            data.forEach((entry) => {
                const worktime = new Worktime(entry);
                if (entry.interval) worktime.startTimer();
                this.worktime.push(worktime);
            });
        }

        this.startSaveInterval();
    }

    public initiateHistory() {
        const dataString = localStorage.getItem(LocalStorageKey.WORKTIME_HISTORY);
        if (!dataString) return;

        const data = JSON.parse(dataString) as HistoricalWorktimeTemplate[];
        data.forEach((entry) => {
            const {id, task, time, dateArchived, stateHistory} = entry;
            const historicalWorktime = new HistoricalWorktime(task, time, dateArchived, id, stateHistory);
            this.worktimeHistorySignal.update(value => [...value, historicalWorktime]);
        });
    }

    private startSaveInterval() {
        this.saveInterval = setInterval(() => {
            if (!this.sessionService.sessionErrorSignal()) {
                this.saveWorktimeToLocalStorage();
                return;
            }

            this.stopAllWorktimeTimers();
            this.stopSaveInterval();
            this.dialogService.openInfoDialog(
                'Session conflict',
                'There is an another application instance running in the browser. Please close other instances and reload page.',
                {closable: false}
            );
        }, 1000);
    }

    private stopSaveInterval() {
        if (this.saveInterval) clearInterval(this.saveInterval);
        this.saveInterval = null;
    }

    private saveWorktimeToLocalStorage() {
        const worktimeTemplates = this.worktime.map(entry => mapWorktimeToWorktimeTemplate(entry));
        const data = JSON.stringify(worktimeTemplates);
        localStorage.setItem(LocalStorageKey.WORKTIME, data);
    }

    private saveWorktimeHistoryToLocalStorage() {
        const data = JSON.stringify(this.worktimeHistorySignal());
        localStorage.setItem(LocalStorageKey.WORKTIME_HISTORY, data);
    }

    public addWorktime() {
        this.worktime.push(new Worktime());
    }

    public removeWorktime(worktime: Worktime) {
        worktime.stopTimer(true);
        this.addWorktimeToHistory(worktime);
        const index = this.worktime.indexOf(worktime);
        if (index < 0) return;

        this.worktime.splice(index, 1);
    }

    private stopAllWorktimeTimers() {
        this.worktime.forEach((entry, index) => entry.stopTimer(true));
    }

    public addWorktimeToHistoryAndReset(worktime: Worktime) {
        this.addWorktimeToHistory(worktime);
        worktime.resetTime();
    }

    public addWorktimeToHistory(worktime: Worktime) {
        const {time, task} = worktime;
        if (time === 0) return;

        const dateArchived = new Date();
        this.worktimeHistorySignal.update(value => [...value, new HistoricalWorktime(task, time, dateArchived)]);
        this.saveWorktimeHistoryToLocalStorage();
    }
}
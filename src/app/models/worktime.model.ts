import {WorktimeStateHistory} from 'src/app/interfaces/worktime-state-history.interface';
import {WorktimeTemplate} from 'src/app/interfaces/worktime-template.interface';
import {generateId, getDuration, TIME_STEP} from 'src/app/utils/misc.util';
import {setInterval, clearInterval} from 'worker-timers';

export class Worktime implements WorktimeTemplate {
    public id: string = generateId();
    public task: string = '';
    public time: number = 0;
    public interval: number | null = null;
    public stateUpdateDate: Date | null = null;
    public stateHistory: WorktimeStateHistory[] = [];

    constructor(data?: WorktimeTemplate) {
        if (!data) return;

        const {id, task, time, stateUpdateDate, stateHistory} = data;
        this.id = id;
        this.task = task;
        this.time = time;
        this.interval = null;
        this.stateUpdateDate = stateUpdateDate;
        this.stateHistory = stateHistory;
    }

    private increment() {
        this.time += 1;
    }

    public handleTimer() {
        this.interval ? this.stopTimer() : this.startTimer();
    }

    public startTimer() {
        this.interval = setInterval(() => this.increment(), TIME_STEP);
        this.addStateHistory(true);
        this.clearStateUpdateDate();
    }

    public stopTimer(noCopy?: boolean) {
        if (this.interval) clearInterval(this.interval);
        this.interval = null;
        this.addStateHistory(false);
        this.stateUpdateDate = new Date();
        if (!noCopy) this.copyDuration();
    }

    private addStateHistory(counting: boolean) {
        this.stateHistory.push({counting, date: new Date().getTime()});
    }

    public addTime() {
        this.time += TIME_STEP;
    }

    public subtractTime() {
        let newTime = this.time - TIME_STEP;
        if (newTime < 0) {
            this.time = 0;
            return;
        }

        this.time = newTime;
    }

    public resetTime() {
        this.time = 0;
    }

    public addDifferencingTime() {
        const lastStateUpdateDate = this.stateUpdateDate;
        if (!lastStateUpdateDate) return;

        const lastStateUpdateDateAsDate = (new Date(lastStateUpdateDate)).setMilliseconds(0) / 1000;
        const now = (new Date()).setMilliseconds(0) / 1000;
        const difference = now - lastStateUpdateDateAsDate;
        this.time += difference;
        this.clearStateUpdateDate();
    }

    public clearStateUpdateDate() {
        this.stateUpdateDate = null;
    }

    public async openTask() {
        const link = this.task;
        if (!this.task.includes('https://')) {
            await this.copyDuration();
            window.open(link, '_blank');
        }
    }

    public copyDuration() {
        const value = getDuration(this.time);
        const indexOfMinutes = value.indexOf('m');
        const indexOfHours = value.indexOf('h');
        return navigator.clipboard.writeText(indexOfMinutes < 0 ?
            value.slice(0, indexOfHours + 1) :
            value.slice(0, indexOfMinutes + 1));
    }
}
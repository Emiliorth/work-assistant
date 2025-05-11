import {WorktimeTemplate} from 'src/app/interfaces/worktime-template.interface';
import {generateId, getDuration, TIME_STEP} from 'src/app/utils/misc.util';
import {clearInterval, setInterval} from 'worker-timers';

export class Worktime {
    public data: WorktimeTemplate;

    constructor(data?: WorktimeTemplate) {
        const {id, task, time, stateUpdateDate, stateHistory} = data ?? {} as WorktimeTemplate;
        this.data = {
            id: id ?? generateId(),
            task: task ?? '',
            time: time ?? 0,
            interval: null,
            stateUpdateDate: stateUpdateDate ?? null,
            stateHistory: stateHistory ?? []
        };
    }

    private increment() {
        this.data.time += 1;
    }

    public handleTimer() {
        this.data.interval ? this.stopTimer() : this.startTimer();
    }

    public startTimer() {
        this.data.interval = setInterval(() => this.increment(), TIME_STEP);
        this.addStateHistory(true);
        this.clearStateUpdateDate();
    }

    public stopTimer(noCopy?: boolean) {
        if (this.data.interval) clearInterval(this.data.interval);
        this.data.interval = null;
        this.addStateHistory(false);
        this.data.stateUpdateDate = new Date();
        if (!noCopy) this.copyDuration();
    }

    private addStateHistory(counting: boolean) {
        this.data.stateHistory.push({counting, date: new Date().getTime()});
    }

    public addTime() {
        this.data.time += TIME_STEP;
    }

    public subtractTime() {
        let newTime = this.data.time - TIME_STEP;
        if (newTime < 0) {
            this.data.time = 0;
            return;
        }

        this.data.time = newTime;
    }

    public resetTime() {
        this.data.time = 0;
    }

    public addDifferencingTime() {
        const lastStateUpdateDate = this.data.stateUpdateDate;
        if (!lastStateUpdateDate) return;

        const lastStateUpdateDateAsDate = (new Date(lastStateUpdateDate)).setMilliseconds(0) / 1000;
        const now = (new Date()).setMilliseconds(0) / 1000;
        const difference = now - lastStateUpdateDateAsDate;
        this.data.time += difference;
        this.clearStateUpdateDate();
    }

    public clearStateUpdateDate() {
        this.data.stateUpdateDate = null;
    }

    public async openTask() {
        const link = this.data.task;
        if (!link.includes('https://') || !link.includes('http://')) return;

        await this.copyDuration();
        window.open(link, '_blank');
    }

    public copyDuration() {
        const value = getDuration(this.data.time);
        const indexOfMinutes = value.indexOf('m');
        const indexOfHours = value.indexOf('h');
        return navigator.clipboard.writeText(indexOfMinutes < 0 ?
            value.slice(0, indexOfHours + 1) :
            value.slice(0, indexOfMinutes + 1));
    }
}
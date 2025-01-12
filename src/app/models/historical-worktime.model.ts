import {HistoricalWorktimeTemplate} from 'src/app/interfaces/historical-worktime-template.interface';
import {WorktimeStateHistory} from 'src/app/interfaces/worktime-state-history.interface';
import {generateId} from 'src/app/utils/misc.util';

export class HistoricalWorktime implements HistoricalWorktimeTemplate {
    constructor(
        public task: string,
        public time: number,
        public dateArchived: Date,
        public id: string = generateId(),
        public stateHistory: WorktimeStateHistory[] = []
    ) {
    }
}
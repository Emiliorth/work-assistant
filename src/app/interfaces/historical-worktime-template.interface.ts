import {WorktimeStateHistory} from 'src/app/interfaces/worktime-state-history.interface';

export interface HistoricalWorktimeTemplate {
    id?: string;
    task?: string;
    time?: number;
    dateArchived?: Date;
    stateHistory?: WorktimeStateHistory[];
}
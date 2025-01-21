import {WorktimeStateHistory} from 'src/app/interfaces/worktime-state-history.interface';

export interface WorktimeTemplate {
    id: string;
    task: string;
    time: number;
    interval: number | null;
    stateUpdateDate: Date | null;
    stateHistory: WorktimeStateHistory[];
}
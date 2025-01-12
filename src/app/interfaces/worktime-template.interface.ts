import {WorktimeStateHistory} from 'src/app/interfaces/worktime-state-history.interface';

export interface WorktimeTemplate {
    id: string;
    task: string;
    time: number;
    counting: boolean;
    stateUpdateDate: Date | null;
    stateHistory: WorktimeStateHistory[];
}
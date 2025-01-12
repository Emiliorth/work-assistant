import {WorktimeTemplate} from 'src/app/interfaces/worktime-template.interface';
import {Worktime} from 'src/app/models/worktime.model';

export const mapWorktimeToWorktimeTemplate = (data: Worktime) => {
    const {id, task, time, counting, stateUpdateDate, stateHistory} = data;
    const result: WorktimeTemplate = {id, task, time, counting, stateUpdateDate, stateHistory};
    return result;
};
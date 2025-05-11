import {WorktimeTemplate} from 'src/app/interfaces/worktime-template.interface';
import {Worktime} from 'src/app/models/worktime.model';

export const mapWorktimeToWorktimeTemplate = (data: Worktime) => {
    const result: WorktimeTemplate = {...data.data};
    return result;
};
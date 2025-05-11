import {HistoricalWorktimeTemplate} from 'src/app/interfaces/historical-worktime-template.interface';
import {generateId} from 'src/app/utils/misc.util';

export class HistoricalWorktime {
    public data: HistoricalWorktimeTemplate;

    constructor(data: HistoricalWorktimeTemplate) {
        this.data = {
            ...data,
            id: data.id ?? generateId(),
            stateHistory: data.stateHistory ?? []
        };
    }
}
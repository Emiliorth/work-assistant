import {WorktimeEntryElement} from 'src/app/enums/worktime-entry-element.enum';

export interface WorktimeEntryTemplate {
    class: string;
    elements: {
        class: string;
        element: WorktimeEntryElement;
    }[];
}
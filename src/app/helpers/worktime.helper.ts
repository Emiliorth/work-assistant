import {Breakpoint} from 'src/app/enums/breakpoint.enum';
import {WorktimeEntryElement} from 'src/app/enums/worktime-entry-element.enum';
import {TypedObject} from 'src/app/interfaces/typed-object.interface';
import {WorktimeEntryTemplate} from 'src/app/interfaces/worktime-entry-template.interface';

export const WORKTIME_ENTRY_TEMPLATES: TypedObject<WorktimeEntryTemplate[]> = {
    [Breakpoint.XXL]: [
        {
            class: 'align-items-center',
            elements: [
                {element: WorktimeEntryElement.TASK, class: 'col'},
                {element: WorktimeEntryElement.OPEN_TASK, class: 'col-auto'},
                {element: WorktimeEntryElement.HANDLE_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.TIME, class: 'col-auto'},
                {element: WorktimeEntryElement.STATE_UPDATE_DATE, class: 'col-auto'},
                {element: WorktimeEntryElement.RESET_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.MOVE_TO_HISTORY_AND_RESET, class: 'col-auto'},
                {element: WorktimeEntryElement.REMOVE_WORKTIME, class: 'col-auto'}
            ]
        }
    ],
    [Breakpoint.XL]: [
        {
            class: 'align-items-center',
            elements: [
                {element: WorktimeEntryElement.TASK, class: 'col'},
                {element: WorktimeEntryElement.OPEN_TASK, class: 'col-auto'},
                {element: WorktimeEntryElement.HANDLE_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.TIME, class: 'col-auto'},
                {element: WorktimeEntryElement.STATE_UPDATE_DATE, class: 'col-auto'},
                {element: WorktimeEntryElement.RESET_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.MOVE_TO_HISTORY_AND_RESET, class: 'col-auto'},
                {element: WorktimeEntryElement.REMOVE_WORKTIME, class: 'col-auto'}
            ]
        }
    ],
    [Breakpoint.LG]: [
        {
            class: 'justify-content-center align-items-center',
            elements: [
                {element: WorktimeEntryElement.TASK, class: 'col'},
                {element: WorktimeEntryElement.OPEN_TASK, class: 'col-auto'},
                {element: WorktimeEntryElement.HANDLE_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.TIME, class: 'col-auto'},
                {element: WorktimeEntryElement.RESET_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.MOVE_TO_HISTORY_AND_RESET, class: 'col-auto'},
                {element: WorktimeEntryElement.REMOVE_WORKTIME, class: 'col-auto'},
                {element: WorktimeEntryElement.STATE_UPDATE_DATE, class: 'col-12 justify-items-center'}
            ]
        }
    ],
    [Breakpoint.MD]: [
        {
            class: 'align-items-center',
            elements: [
                {element: WorktimeEntryElement.TASK, class: 'col'},
                {element: WorktimeEntryElement.OPEN_TASK, class: 'col-auto'},
                {element: WorktimeEntryElement.REMOVE_WORKTIME, class: 'col-auto'}
            ]
        },
        {
            class: 'justify-content-center align-items-center',
            elements: [
                {element: WorktimeEntryElement.HANDLE_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.TIME, class: 'col-auto'},
                {element: WorktimeEntryElement.STATE_UPDATE_DATE, class: 'col-auto'},
                {element: WorktimeEntryElement.RESET_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.MOVE_TO_HISTORY_AND_RESET, class: 'col-auto'}
            ]
        }
    ],
    [Breakpoint.SM]: [
        {
            class: 'align-items-center',
            elements: [
                {element: WorktimeEntryElement.TASK, class: 'col'},
                {element: WorktimeEntryElement.REMOVE_WORKTIME, class: 'col-auto'}
            ]
        },
        {
            class: 'justify-content-center align-items-center',
            elements: [
                {element: WorktimeEntryElement.OPEN_TASK, class: 'col-auto'},
                {element: WorktimeEntryElement.HANDLE_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.TIME, class: 'col-auto'},
                {element: WorktimeEntryElement.RESET_TIMER, class: 'col-auto'},
                {element: WorktimeEntryElement.MOVE_TO_HISTORY_AND_RESET, class: 'col-auto'},
                {element: WorktimeEntryElement.STATE_UPDATE_DATE, class: 'col-12 justify-items-center'}
            ]
        }
    ],
    [Breakpoint.XS]: [
        {
            class: 'align-items-center',
            elements: [
                {element: WorktimeEntryElement.TASK, class: 'col'},
                {element: WorktimeEntryElement.REMOVE_WORKTIME, class: 'col-auto'}
            ]
        },
        {
            class: 'align-items-center flex-wrap',
            elements: [
                {element: WorktimeEntryElement.OPEN_TASK, class: 'col-3'},
                {element: WorktimeEntryElement.HANDLE_TIMER, class: 'col-3'},
                {element: WorktimeEntryElement.RESET_TIMER, class: 'col-3'},
                {element: WorktimeEntryElement.MOVE_TO_HISTORY_AND_RESET, class: 'col-3'},
                {element: WorktimeEntryElement.TIME, class: 'col-12'},
                {element: WorktimeEntryElement.STATE_UPDATE_DATE, class: 'col-12 justify-items-center'}
            ]
        }
    ]
};
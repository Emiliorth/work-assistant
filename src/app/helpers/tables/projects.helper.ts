import {TableColumnTemplate} from 'src/app/interfaces/table-column-template.interface';
import {Project} from 'src/app/models/project.model';

export enum ProjectTableField {
    NAME = 'name'
}

export const TABLE: TableColumnTemplate<Project>[] = [
    {field: ProjectTableField.NAME, sortable: true},
    {actions: true}
];
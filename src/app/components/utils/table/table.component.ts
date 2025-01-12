import {NgTemplateOutlet} from '@angular/common';
import {Component, computed, contentChildren, input, InputSignal, OnInit, Signal, TemplateRef} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CustomTemplateDirective} from 'src/app/directives/custom-template.directive';
import {TableColumnTemplate} from 'src/app/interfaces/table-column-template.interface';
import {CustomFnPipe} from 'src/app/pipes/custom-fn.pipe';

const PIPES = [
    CustomFnPipe
];

const PRIME_NG = [
    TableModule
];

@Component({
    selector: 'app-table',
    imports: [
        NgTemplateOutlet,
        ...PIPES,
        ...PRIME_NG
    ],
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
    public dataSignal: InputSignal<any[]> = input.required();
    public tableTemplateSignal: InputSignal<TableColumnTemplate<any>[]> = input.required();

    protected templateRefsSignal: Signal<ReadonlyArray<CustomTemplateDirective>> = contentChildren<CustomTemplateDirective>(CustomTemplateDirective);
    protected templatesSignal!: Signal<(TemplateRef<any> | null)[]>;

    public ngOnInit() {
        this.templatesSignal = this.prepareTemplates();
    }

    private prepareTemplates() {
        return computed(() => this.tableTemplateSignal()
                                  .map(entry => this.templateRefsSignal()
                                                    .find(e => e.templateName && entry.templateName && e.templateName === entry.templateName || e.actions && entry.actions)?.template ?? null));
    }
}
import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
    selector: '[customTemplate]'
})
export class CustomTemplateDirective {
    @Input() templateName?: string;
    @Input() actions?: boolean;

    constructor(
        public template: TemplateRef<any>
    ) {
    }
}
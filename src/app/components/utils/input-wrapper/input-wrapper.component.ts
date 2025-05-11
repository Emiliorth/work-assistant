import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {FloatLabel, FloatLabelModule} from 'primeng/floatlabel';
import {IftaLabelModule} from 'primeng/iftalabel';
import {InputTextModule} from 'primeng/inputtext';
import {InputType} from 'src/app/enums/input-type.enum';
import {DynamicForm} from 'src/app/models/forms/core/dynamic-form.model';
import {InputOptions} from 'src/app/types/input-options.type';
import {generateId} from 'src/app/utils/misc.util';

const PRIME_NG = [
    InputTextModule,
    DropdownModule,
    FloatLabelModule,
    IftaLabelModule
];

@Component({
    selector: 'app-input-wrapper',
    templateUrl: './input-wrapper.component.html',
    imports: [
        ReactiveFormsModule,
        ...PRIME_NG
    ],
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: FormGroupDirective
        }
    ]
})
export class InputWrapperComponent implements OnInit {
    @Input({required: true}) public form!: DynamicForm<any>;
    @Input({required: true}) public controlName!: string;
    @Input() public label?: string;
    @Input() public inputOptions?: InputOptions<unknown>;

    protected id: string = generateId() + '_' + this.controlName;
    protected filterable: boolean = true;
    protected clearable: boolean = true;

    protected readonly InputType = InputType;

    public ngOnInit() {
    }
}
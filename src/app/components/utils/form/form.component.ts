import {NgClass} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputWrapperComponent} from 'src/app/components/utils/input-wrapper/input-wrapper.component';
import {ButtonSeverity} from 'src/app/enums/button-severity.enum';
import {DynamicForm} from 'src/app/models/forms/dynamic-form.model';
import {InputsOptions} from 'src/app/types/inputs-options.type';

const COMPONENTS = [
    InputWrapperComponent
];

const PRIME_NG = [
    ButtonModule
];

@Component({
    selector: 'app-form',
    imports: [
        NgClass,
        ReactiveFormsModule,
        ...COMPONENTS,
        ...PRIME_NG
    ],
    templateUrl: './form.component.html'
})
export class FormComponent {
    @Input({required: true}) public form!: DynamicForm<any>;
    @Input() public inputsOptions?: InputsOptions;

    @Output() public save: EventEmitter<any> = new EventEmitter();
    @Output() public customCancel: EventEmitter<void> = new EventEmitter();

    protected readonly ButtonSeverity = ButtonSeverity;

    protected onSave() {
        if (!this.form.validateForm()) return;

        this.save.emit(this.form.getFormData());
    }

    protected onCancel() {
        this.customCancel.emit();
    }
}
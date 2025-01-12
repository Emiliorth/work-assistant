import {FormBuilder, FormGroup} from '@angular/forms';
import {InputType} from 'src/app/enums/input-type.enum';
import {INPUT_DEFAULT_VALUES, NON_NULLABLE_INPUT_TYPES} from 'src/app/helpers/form.helper';
import {FormClasses} from 'src/app/types/form/form-classes.type';
import {FormControlNamesObj} from 'src/app/types/form/form-control-names-obj.type';
import {FormControlNames} from 'src/app/types/form/form-control-names.type';
import {FormDefinition} from 'src/app/types/form/form-definition.type';
import {FormInputTypes, FormInputTypesDefinition} from 'src/app/types/form/form-input-types.type';
import {FormLabels} from 'src/app/types/form/form-labels.type';
import {FormValidators} from 'src/app/types/form/form-validators.type';
import {convertArrayToObject, convertObjectValuesToSignals, convertValueToObject} from 'src/app/utils/object.util';

export abstract class DynamicForm<T> {
    public formGroup: FormGroup;
    public controlNamesObj: FormControlNamesObj = {};
    public controlNames: FormControlNames = [];
    public inputTypes: FormInputTypes = {};
    public validators: FormValidators = {};
    public classes: FormClasses = {};
    public labels: FormLabels = {};

    private readonly formBuilder = new FormBuilder();

    protected constructor(dataA?: any) {
        this.prepareDefinitions(dataA);
        this.formGroup = this.generateForm();
    }

    protected abstract prepareDefinitions(dataA?: any): void;

    public getFormData(): T {
        return this.formGroup.getRawValue();
    }

    protected prepareDefinitionsLogic(data: FormDefinition) {
        const {
            controlNames,
            inputTypes,
            validators,
            classes,
            labels
        } = data;

        this.controlNamesObj = controlNames;
        this.controlNames = Object.values(controlNames);
        this.inputTypes = convertObjectValuesToSignals(inputTypes) ?? {};
        this.validators = validators ?? {};
        this.classes = classes ?? {};
        this.labels = labels ?? {};
    }

    private getBuilder(controlName: string) {
        return NON_NULLABLE_INPUT_TYPES.includes(this.inputTypes[controlName]()) ? this.formBuilder.nonNullable : this.formBuilder;
    }

    private generateFormControl(controlName: string) {
        return this.getBuilder(controlName).control({
                value: INPUT_DEFAULT_VALUES[this.inputTypes[controlName]()],
                disabled: false
            },
            this.validators[controlName]);
    }

    private generateFormControls() {
        return convertArrayToObject(this.controlNames.map((entry) => convertValueToObject(this.generateFormControl(entry), entry)));
    }

    protected generateForm() {
        return this.formBuilder.group(this.generateFormControls());
    }

    protected patchValues(data: any, options?: {emitEvent?: boolean}) {
        const {emitEvent} = options || {};
        const result = convertArrayToObject(this.controlNames.map(entry => convertValueToObject(data[entry], entry)));
        this.formGroup.patchValue(result, {emitEvent})
    }

    public patchValue(value: any, controlName: string, options?: {emitEvent?: boolean}) {
        const {emitEvent} = options || {};
        this.formGroup.controls[controlName].patchValue(value, {emitEvent});
    }

    public validateForm() {
        this.formGroup.markAllAsTouched();
        this.controlNames.forEach(entry => this.formGroup.controls[entry].markAsDirty());
        return this.formGroup.valid;
    }

    public reset() {
        this.formGroup.reset();
    }
}
import {FormClasses} from 'src/app/types/form/form-classes.type';
import {FormControlNamesObj} from 'src/app/types/form/form-control-names-obj.type';
import {FormInputTypesDefinition} from 'src/app/types/form/form-input-types.type';
import {FormLabels} from 'src/app/types/form/form-labels.type';
import {FormValidators} from 'src/app/types/form/form-validators.type';

export type FormDefinition = {
    controlNames: FormControlNamesObj,
    inputTypes: FormInputTypesDefinition,
    validators?: FormValidators,
    classes?: FormClasses,
    labels?: FormLabels
};
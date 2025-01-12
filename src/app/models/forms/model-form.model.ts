import {TypedObject} from 'src/app/interfaces/typed-object.interface';
import {DynamicForm} from 'src/app/models/forms/dynamic-form.model';
import {FormDefinition} from 'src/app/types/form/form-definition.type';

export class ModelForm extends DynamicForm<TypedObject<any>> {
    constructor(formDefinition: FormDefinition) {
        super(formDefinition);
    }

    protected prepareDefinitions(formDefinitions: FormDefinition) {
        const {
            controlNames,
            inputTypes,
            validators,
            classes,
            labels
        } = formDefinitions;

        this.prepareDefinitionsLogic({
            controlNames,
            inputTypes,
            validators,
            classes,
            labels
        });
    }
}
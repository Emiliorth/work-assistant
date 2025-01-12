import {WritableSignal} from '@angular/core';
import {InputType} from 'src/app/enums/input-type.enum';
import {TypedObject} from 'src/app/interfaces/typed-object.interface';

export type FormInputTypesDefinition = TypedObject<InputType>;
export type FormInputTypes = TypedObject<WritableSignal<InputType>>;
import {ValidatorFn} from '@angular/forms';
import {TypedObject} from 'src/app/interfaces/typed-object.interface';

export type FormValidators = TypedObject<ValidatorFn[]>;
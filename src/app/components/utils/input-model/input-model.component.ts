import {Component, EventEmitter, Input, model, ModelSignal, OnInit, Output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Subscription} from 'rxjs';
import {InputWrapperComponent} from 'src/app/components/utils/input-wrapper/input-wrapper.component';
import {AutoSubscribe} from 'src/app/decorators/auto-subscribe.decorator';
import {AutoUnsubscribe} from 'src/app/decorators/auto-unsubscribe.decorator';
import {InputType} from 'src/app/enums/input-type.enum';
import {ModelForm} from 'src/app/models/forms/model-form.model';
import {FormDefinition} from 'src/app/types/form/form-definition.type';
import {InputOptions} from 'src/app/types/input-options.type';
import {generateId} from 'src/app/utils/misc.util';

@Component({
    selector: 'app-input-model',
    templateUrl: './input-model.component.html',
    imports: [
        ReactiveFormsModule,
        InputWrapperComponent
    ]
})
export class InputModelComponent implements OnInit {
    @Input() public set model(value: any) {
        if (this._model === value) return;

        this._model = value;
        this.form?.patchValue(value, this.controlName, {emitEvent: false});
    };

    @Input({required: true}) public inputType!: InputType;
    @Input({required: true}) public label!: string;
    @Input() public inputOptions?: InputOptions<unknown>;

    @Output() public modelChange: EventEmitter<any> = new EventEmitter();

    protected controlName: string = generateId();
    protected id: string = this.controlName;
    protected form?: ModelForm;

    private _model: any;

    @AutoUnsubscribe private subscriptions: Subscription = new Subscription();

    public ngOnInit() {
        const formDefinition: FormDefinition = {
            controlNames: {[this.controlName]: this.controlName},
            inputTypes: {[this.controlName]: this.inputType}
        };

        this.form = new ModelForm(formDefinition);
    }

    @AutoSubscribe
    private watchForValueChange = () => {
        this.form?.formGroup.controls[this.controlName].valueChanges.subscribe(value => {
            this._model = value;
            this.modelChange.emit(value);
        });
    };
}
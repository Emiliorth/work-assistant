import {NgClass} from '@angular/common';
import {Component, Input, model, ModelSignal, output, OutputEmitterRef} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ButtonSeverity} from 'src/app/enums/button-severity.enum';

const PRIME_NG = [
    DialogModule,
    ButtonModule
];

@Component({
    selector: 'app-dialog',
    imports: [
        NgClass,
        ...PRIME_NG
    ],
    templateUrl: './dialog.component.html'
})
export class DialogComponent {
    public display: ModelSignal<any> = model<any>();
    @Input() public header?: string;
    @Input() public message?: string;
    @Input() public width?: string;
    @Input() public maxWidth?: string;
    @Input() public confirmButton: string | null = null;
    @Input() public confirmButtonSeverity: ButtonSeverity = ButtonSeverity.INFO;
    @Input() public confirmFn?: (() => void) | null;
    @Input() public cancelButton: string | null = null;
    @Input() public cancelFn?: (() => void) | null;
    @Input() public closable: boolean = true;

    public cancel: OutputEmitterRef<void> = output<void>();
    public confirm: OutputEmitterRef<void> = output<void>();

    protected readonly ButtonSeverity = ButtonSeverity;

    public openDialog() {
        this.display.set(true);
    }

    public closeDialog() {
        this.display.set(false);
    }

    protected onCancel() {
        this.cancelFn?.();
        this.display.set(false);
        this.cancel.emit();
    }

    protected onConfirm() {
        this.confirmFn?.();
        this.display.set(false);
        this.confirm.emit();
    }
}
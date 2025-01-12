import {Injectable} from '@angular/core';
import {ButtonSeverity} from 'src/app/enums/button-severity.enum';

@Injectable({providedIn: 'root'})
export class DialogService {
    public display: boolean = false;
    public header: string = '';
    public message: string = '';
    public width?: string;
    public confirmButton: string | null = null;
    public confirmButtonSeverity: ButtonSeverity = ButtonSeverity.INFO;
    public confirmFn: (() => void) | null = null;
    public cancelButton: string | null = null;
    public cancelFn: (() => void) | null = null;
    public closable: boolean = true;

    private reset() {
        this.header = '';
        this.width = undefined;
        this.message = '';
        this.confirmButton = null;
        this.confirmButtonSeverity = ButtonSeverity.INFO;
        this.confirmFn = null;
        this.cancelButton = null;
        this.cancelFn = null;
        this.closable = true;
    }

    public openConfirmDialog(header: string, message: string, options?: {
        confirmButton?: string,
        cancelButton?: string,
        confirmButtonSeverity?: ButtonSeverity,
        confirmFn?: () => void,
        cancelFn?: () => void,
        closable?: boolean
    }) {
        const {confirmButton, cancelButton, confirmButtonSeverity, confirmFn, cancelFn, closable} = options ?? {};
        this.header = header;
        this.message = message;
        this.confirmButton = confirmButton ?? 'Ok';
        this.cancelButton = cancelButton ?? 'Cancel';
        this.confirmButtonSeverity = confirmButtonSeverity ?? this.confirmButtonSeverity;
        this.confirmFn = confirmFn ?? null;
        this.cancelFn = cancelFn ?? null;
        this.closable = closable ?? true;
        this.display = true;
    }

    public openInfoDialog(header: string, message: string, options?: {
        confirmButton?: string,
        confirmButtonSeverity?: ButtonSeverity,
        closable?: boolean
    }) {
        const {confirmButton, confirmButtonSeverity, closable} = options ?? {};
        this.header = header;
        this.message = message;
        this.confirmButton = confirmButton ?? 'Ok';
        this.confirmButtonSeverity = confirmButtonSeverity ?? this.confirmButtonSeverity;
        this.closable = closable ?? true;
        this.display = true;
    }

    public closeDialog() {
        this.display = false;
        this.reset();
    }
}
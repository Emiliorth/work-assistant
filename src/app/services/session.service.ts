import {Injectable, signal, WritableSignal} from '@angular/core';
import {LocalStorageKey} from 'src/app/enums/local-storage-key.enum';
import {generateId} from 'src/app/utils/misc.util';
import {clearInterval, setInterval} from 'worker-timers';

@Injectable({providedIn: 'root'})
export class SessionService {
    public sessionId: string = generateId();
    public sessionErrorSignal: WritableSignal<boolean> = signal(false);

    private interval: number | null = null;

    constructor() {
        this.initiate();
    }

    private get sessionIdFromLocalStorage() {
        return localStorage.getItem(LocalStorageKey.SESSION_ID);
    }

    private initiate() {
        localStorage.setItem(LocalStorageKey.SESSION_ID, this.sessionId);
        this.interval = setInterval(() => {
            if (Boolean(this.sessionIdFromLocalStorage && !this.sessionErrorSignal() || this.checkSessionId())) return;

            this.sessionErrorSignal.set(true);
            if (this.interval) clearInterval(this.interval);
            this.interval = null;
        }, 1000);
    }

    private checkSessionId() {
        return this.sessionId === localStorage.getItem(LocalStorageKey.SESSION_ID);
    }
}
import {Injectable, signal, WritableSignal} from '@angular/core';
import {filter, interval, Subscription, tap} from 'rxjs';
import {LocalStorageKey} from 'src/app/enums/local-storage-key.enum';
import {generateId} from 'src/app/utils/misc.util';

@Injectable({providedIn: 'root'})
export class SessionService {
    public sessionId: string = generateId();
    public sessionErrorSignal: WritableSignal<boolean> = signal(false);

    private subscription: Subscription = new Subscription();

    constructor() {
        this.initiate();
    }

    private get sessionIdFromLocalStorage() {
        return localStorage.getItem(LocalStorageKey.SESSION_ID);
    }

    private initiate() {
        localStorage.setItem(LocalStorageKey.SESSION_ID, this.sessionId);
        this.subscription.add(interval(1000).pipe(
            filter(() => Boolean(this.sessionIdFromLocalStorage && !this.sessionErrorSignal())),
            tap(() => {
                if (this.checkSessionId()) return;

                this.sessionErrorSignal.set(true);
                this.subscription.unsubscribe();
            })
        ).subscribe());
    }

    private checkSessionId() {
        return this.sessionId === localStorage.getItem(LocalStorageKey.SESSION_ID);
    }
}
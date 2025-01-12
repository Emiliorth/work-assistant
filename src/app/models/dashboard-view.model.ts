import {computed, signal, Signal, Type, WritableSignal} from '@angular/core';
import {DashboardViewName} from 'src/app/enums/dashboard-view-name.enum';
import {DashboardViewTemplate} from 'src/app/interfaces/dashboard-view-template.interface';

export class DashboardView implements DashboardViewTemplate {
    public component: Type<any>;
    public componentName: DashboardViewName;
    public colsSignal: Signal<number>;
    public rowsSignal: WritableSignal<number>;

    private readonly _colsSignal: WritableSignal<number>;
    private readonly colsLimitSignal: Signal<number>;

    constructor(
        colsLimitSignal: Signal<number>,
        data: DashboardViewTemplate
    ) {
        const {component, componentName, cols, rows} = data;
        this.component = component;
        this.componentName = componentName;
        this._colsSignal = signal(cols ?? 1);
        this.rowsSignal = signal(rows ?? 1);
        this.colsLimitSignal = colsLimitSignal;
        this.colsSignal = computed(() => {
            const cols = this._colsSignal();
            const colsLimit = this.colsLimitSignal();
            return cols > colsLimit ? colsLimit : cols;
        });
    }

    public stretchX(callback?: () => void) {
        this._colsSignal.update(value => value < this.colsLimitSignal() ? ++value : value);
        callback?.();
    }

    public shrinkX(callback?: () => void) {
        this._colsSignal.update(value => {
            const colsLimit = this.colsLimitSignal();
            return value === 1 ? value : (value - 1 >= colsLimit ? colsLimit : value) - 1;
        });

        callback?.();
    }

    public stretchY(callback?: () => void) {
        this.rowsSignal.update(value => ++value);
        callback?.();
    }

    public shrinkY(callback?: () => void) {
        this.rowsSignal.update(value => value > 1 ? --value : value);
        callback?.();
    }
}
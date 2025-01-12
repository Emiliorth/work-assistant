import {Component} from '@angular/core';
import {DashboardComponent} from 'src/app/components/main-components/dashboard/dashboard.component';
import {DialogComponent} from 'src/app/components/utils/dialog/dialog.component';
import {DialogService} from 'src/app/services/dialog.service';
import {SessionService} from 'src/app/services/session.service';

const COMPONENTS = [
    DashboardComponent,
    DialogComponent
];

@Component({
    selector: 'app-root',
    imports: [
        ...COMPONENTS
    ],
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(
        protected dialogService: DialogService,
        protected sessionService: SessionService
    ) {
    }
}
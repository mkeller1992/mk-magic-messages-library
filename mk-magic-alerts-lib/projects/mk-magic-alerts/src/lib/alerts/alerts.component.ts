import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertsStore } from './alerts.store';
import { AlertComponent } from './alert/alert.component';
import { Alert } from './models/alert.model';

@Component({
    selector: 'magic-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],
    imports: [AlertComponent, AsyncPipe]
})
export class AlertsComponent {

	alerts$: Observable<Alert[]> = this.alertsStore.alerts$;

	constructor(private alertsStore: AlertsStore) { }
}

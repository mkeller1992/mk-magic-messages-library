import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
	private readonly alertsStore = inject(AlertsStore);

	alerts$: Observable<Alert[]> = this.alertsStore.alerts$;
}

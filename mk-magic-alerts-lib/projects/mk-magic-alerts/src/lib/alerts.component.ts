import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertsStoreService } from './alerts-store.service';
import { Alert } from './core/models/alert.model';

@Component({
  selector: 'magic-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {

	alerts$: Observable<Alert[]>;

	constructor(private alertsStore: AlertsStoreService) {
		this.alerts$ = this.alertsStore.alerts$;
	}
}

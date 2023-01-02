import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from './core/models/alert.model';
import { AlertsService } from './alerts.service';

@Component({
  selector: 'magic-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {

	alerts$: Observable<Alert[]>;

	constructor(private alertsService: AlertsService) {
		this.alerts$ = this.alertsService.messages$;
	}
}

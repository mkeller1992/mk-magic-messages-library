import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertsStoreService } from './alerts-store.service';
import { AlertComponent } from './core/alert/alert.component';
import { Alert } from './core/models/alert.model';

@Component({
  selector: 'magic-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  standalone: true,
  imports: [AlertComponent, AsyncPipe]
})
export class AlertsComponent {

	alerts$: Observable<Alert[]> = this.alertsStore.alerts$;

	constructor(private alertsStore: AlertsStoreService) { }
}

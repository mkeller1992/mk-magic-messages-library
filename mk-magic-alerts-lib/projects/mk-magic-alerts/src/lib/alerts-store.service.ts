import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AlertState } from './core/models/alert-state';
import { AlertType } from './core/models/alert-type';
import { Alert } from './core/models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsStoreService {

	private alertsSubject = new BehaviorSubject<Alert[]>([]);

	public alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

	private dismissAllSubject = new Subject<void>();

	public dismissAll$: Observable<void> = this.dismissAllSubject.asObservable();

	dismissAll() {
		this.dismissAllSubject.next();
	}

	addAlert(text: string, type: AlertType, dismissTime: number) {
		// Remove already dismissed alerts
		// filter() makes a shallow copy of the array (a new array, but pointing to the same objects)
		const activeAlerts = this.alertsSubject.getValue().filter((m) => m.state !== AlertState.DISMISSED);

		// Create and add new message:
		activeAlerts.push(new Alert(text, type, dismissTime));

		// Trigger Observable to display alerts:
		this.alertsSubject.next(activeAlerts);
	}
}

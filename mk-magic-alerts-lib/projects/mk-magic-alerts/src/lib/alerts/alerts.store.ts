import { Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject, auditTime } from 'rxjs';
import { AlertState } from './models/alert-state';
import { AlertType } from './models/alert-type';
import { Alert } from './models/alert.model';

@Service()

export class AlertsStore {
	private readonly alertsSubject = new BehaviorSubject<Alert[]>([]);

	private nextAlertId = 1;

	// Added 'auditTime(100)' to prevent error 'NG0100: Expression has changed after it was checked'
	private readonly alertsAudited$: Observable<Alert[]> = this.alertsSubject.asObservable().pipe(
		auditTime(100)
	);

	readonly alerts = toSignal(this.alertsAudited$, { initialValue: [] });

	private readonly dismissAllSubject = new Subject<void>();

	readonly dismissAll$: Observable<void> = this.dismissAllSubject.asObservable();

	dismissAll(): void {
		this.dismissAllSubject.next();
	}

	addAlert(text: string, type: AlertType, dismissTimeInMillis: number): void {
		// Remove already dismissed alerts
		// filter() makes a shallow copy of the array (a new array, but pointing to the same objects)
		 const activeAlerts = this.alertsSubject
			.getValue()
			.filter((alert) => alert.state !== AlertState.DISMISSED);

		// Create and add new message:
		this.alertsSubject.next([
			...activeAlerts,
			this.createAlert(text, type, dismissTimeInMillis)
		]);
	}

	private createAlert(text: string, type: AlertType, dismissTimeInMillis: number): Alert {
		return {
			id: `alert-${this.nextAlertId++}`,
			text,
			type,
			dismissTimeInMillis,
			state: AlertState.DISPLAY
		};
	}
}
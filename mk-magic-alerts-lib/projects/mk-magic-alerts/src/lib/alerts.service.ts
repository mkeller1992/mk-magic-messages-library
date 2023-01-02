import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AlertState } from './core/models/alert-state';
import { AlertType } from './core/models/alert-type';
import { Alert } from './core/models/alert.model';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {
	//
	private messagesSubject = new BehaviorSubject<Alert[]>([]);

	public messages$: Observable<Alert[]> = this.messagesSubject.asObservable();

	private dismissAllSubject = new Subject<boolean>();

	public dismissAll$: Observable<boolean> = this.dismissAllSubject.asObservable();


	showInfo(message: string, dismissTimeInMillis: number = 10_000) {
		this.addMessage(message, 'info', dismissTimeInMillis);
	}

	showSuccess(message: string, dismissTimeInMillis: number = 4_000) {
		this.addMessage(message, 'success', dismissTimeInMillis);
	}

	showWarning(message: string, dismissTimeInMillis: number = 10_000) {
		this.addMessage(message, 'warning', dismissTimeInMillis);
	}

	showError(message: string, dismissTimeInMillis: number = 2_147_483_647) {
		this.addMessage(message, 'error', dismissTimeInMillis);
	}

	clear() {
		this.dismissAllSubject.next(true);
	}

	private addMessage(text: string, type: AlertType, dismissTime: number) {
		// Remove already dismissed Messages
		// filter() makes a shallow copy of the array (a new array, but pointing to the same objects)
		const activeMessages = this.messagesSubject.getValue().filter((m) => m.state !== AlertState.DISMISSED);

		// Create and add new message:
		activeMessages.push(new Alert(text, type, dismissTime));

		// Trigger Observable:
		this.messagesSubject.next(activeMessages);
	}
}

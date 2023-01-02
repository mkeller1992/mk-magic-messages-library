import { Injectable } from '@angular/core';
import { AlertsStoreService } from './alerts-store.service';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {
	//

	constructor(private alertsStore: AlertsStoreService) {}

	showInfo(text: string, dismissTimeInMillis: number = 10_000) {
		this.alertsStore.addAlert(text, 'info', dismissTimeInMillis);
	}

	showSuccess(text: string, dismissTimeInMillis: number = 4_000) {
		this.alertsStore.addAlert(text, 'success', dismissTimeInMillis);
	}

	showWarning(text: string, dismissTimeInMillis: number = 10_000) {
		this.alertsStore.addAlert(text, 'warning', dismissTimeInMillis);
	}

	showError(text: string, dismissTimeInMillis: number = 2_147_483_647) {
		this.alertsStore.addAlert(text, 'error', dismissTimeInMillis);
	}

	clear() {
		this.alertsStore.dismissAll();
	}
}

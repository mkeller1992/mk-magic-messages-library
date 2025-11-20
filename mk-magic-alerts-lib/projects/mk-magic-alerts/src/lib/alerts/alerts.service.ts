import { ApplicationRef, ComponentRef, Injectable, Injector, createComponent, inject } from '@angular/core';
import { AlertsStore } from './alerts.store';
import { AlertsComponent } from './alerts.component';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {
	private readonly alertsStore = inject(AlertsStore);
	private readonly applicationRef = inject(ApplicationRef);
	private readonly injector = inject(Injector);

	private alertsComponentRef!: ComponentRef<AlertsComponent>;

	constructor() {
		this.initializeAlertsComponent();
	}

	private initializeAlertsComponent(): void {
		// Create a div element and append it to the document body
		const hostElement = document.createElement('div');
		document.body.appendChild(hostElement);
	
		// Create AlertsComponent and attach it to the DOM
		this.alertsComponentRef = createComponent(AlertsComponent, {
		hostElement,
		environmentInjector: this.applicationRef.injector,
		elementInjector: this.injector
		});
	
		// Attach the AlertsComponent to the application
		this.applicationRef.attachView(this.alertsComponentRef.hostView);
	}

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

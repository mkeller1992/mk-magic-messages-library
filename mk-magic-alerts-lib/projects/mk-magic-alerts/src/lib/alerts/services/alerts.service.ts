import { ApplicationRef, ComponentRef, Injector, Service, createComponent, inject } from '@angular/core';
import { AlertsStore } from '../state/alerts.store';
import { AlertsContainerComponent } from '../components/alerts-container/alerts-container.component';
import { MAGIC_ALERTS_CONFIG } from '../config/magic-alerts-config';
import { AlertEntryAnimation } from '../models/alert-entry-animation';
import { AlertAppearance } from '../models/alert-appearance';

@Service()

export class AlertsService {
	private readonly alertsStore = inject(AlertsStore);
	private readonly applicationRef = inject(ApplicationRef);
	private readonly injector = inject(Injector);
	private readonly config = inject(MAGIC_ALERTS_CONFIG);

	private alertsComponentRef!: ComponentRef<AlertsContainerComponent>;
	private renderQueued = false;

	constructor() {
		this.initializeAlertsComponent();
	}

	private initializeAlertsComponent(): void {
		// Create a div element and append it to the document body
		const hostElement = document.createElement('div');
		document.body.appendChild(hostElement);

		// Create AlertsContainerComponent and attach it to the DOM
		this.alertsComponentRef = createComponent(AlertsContainerComponent, {
			hostElement,
			environmentInjector: this.applicationRef.injector,
			elementInjector: this.injector
		});
		this.alertsComponentRef.setInput('entryAnimation', this.config.entryAnimation);
		this.alertsComponentRef.setInput('alertAppearance', this.config.alertAppearance);
		this.alertsComponentRef.setInput('alerts', this.alertsStore.alerts());

		// Attach the AlertsContainerComponent to the application
		this.applicationRef.attachView(this.alertsComponentRef.hostView);
		this.alertsComponentRef.changeDetectorRef.detectChanges();
	}

	showInfo(text: string, dismissTimeInMillis: number = 10_000) {
		this.alertsStore.addAlert(text, 'info', dismissTimeInMillis);
		this.syncAlertsToContainer();
		this.queueContainerRender();
	}

	showSuccess(text: string, dismissTimeInMillis: number = 4_000) {
		this.alertsStore.addAlert(text, 'success', dismissTimeInMillis);
		this.syncAlertsToContainer();
		this.queueContainerRender();
	}

	showWarning(text: string, dismissTimeInMillis: number = 10_000) {
		this.alertsStore.addAlert(text, 'warning', dismissTimeInMillis);
		this.syncAlertsToContainer();
		this.queueContainerRender();
	}

	showError(text: string, dismissTimeInMillis: number = 2_147_483_647) {
		this.alertsStore.addAlert(text, 'error', dismissTimeInMillis);
		this.syncAlertsToContainer();
		this.queueContainerRender();
	}

	setEntryAnimation(entryAnimation: AlertEntryAnimation): void {
		this.alertsComponentRef.setInput('entryAnimation', entryAnimation);
		this.queueContainerRender();
	}

	setAlertAppearance(alertAppearance: AlertAppearance): void {
		this.alertsComponentRef.setInput('alertAppearance', alertAppearance);
		this.queueContainerRender();
	}

	clear() {
		this.alertsStore.dismissAll();
		this.syncAlertsToContainer();
		this.queueContainerRender();
	}

	private syncAlertsToContainer(): void {
		this.alertsComponentRef.setInput('alerts', this.alertsStore.alerts());
	}

	private queueContainerRender(): void {
		if (this.renderQueued) {
			return;
		}

		this.renderQueued = true;

		queueMicrotask(() => {
			this.renderQueued = false;
			this.alertsComponentRef.changeDetectorRef.detectChanges();
		});
	}
}

import { ApplicationRef, ComponentRef, Injectable, Injector, createComponent } from '@angular/core';
import { AlertsComponent } from './alerts.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsInitializerService {
  private alertsComponentRef!: ComponentRef<AlertsComponent>;

  constructor(
    private applicationRef: ApplicationRef,
    private injector: Injector) {}

    initializeAlertsComponent(): void {
      if (!this.alertsComponentRef) {
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
    }
}
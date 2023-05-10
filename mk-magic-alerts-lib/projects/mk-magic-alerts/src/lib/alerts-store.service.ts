import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { AlertsComponent } from './alerts.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AlertType } from './core/models/alert-type';
import { Alert } from './core/models/alert.model';
import { AlertState } from './core/models/alert-state';

@Injectable({
  providedIn: 'root'
})
export class AlertsStoreService {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);

  public alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

  private dismissAllSubject = new Subject<void>();

  public dismissAll$: Observable<void> = this.dismissAllSubject.asObservable();

  private alertsComponentRef: ComponentRef<AlertsComponent> | null = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private applicationRef: ApplicationRef,
              private injector: Injector) {
    this.initializeAlertsComponent();
  }

  private initializeAlertsComponent() {
    if (!this.alertsComponentRef) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(AlertsComponent);
      this.alertsComponentRef = factory.create(this.injector);

      // Attach the AlertsComponent to the application
      this.applicationRef.attachView(this.alertsComponentRef.location.nativeElement);

      // Add the AlertsComponent to the DOM
      const container = document.createElement('div');
      container.appendChild(this.alertsComponentRef.location.nativeElement);
      document.body.appendChild(container);
    }
  }

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
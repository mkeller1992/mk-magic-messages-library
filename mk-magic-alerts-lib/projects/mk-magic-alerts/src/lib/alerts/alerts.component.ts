import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertsStore } from './alerts.store';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'magic-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent]
})
export class AlertsComponent {
  private readonly alertsStore = inject(AlertsStore);

  readonly alerts = this.alertsStore.alerts;
}

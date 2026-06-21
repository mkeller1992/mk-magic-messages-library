import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertsStore } from '../../state/alerts.store';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'magic-alerts',
  templateUrl: './alerts-container.component.html',
  styleUrls: ['./alerts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent]
})
export class AlertsContainerComponent {
  private readonly alertsStore = inject(AlertsStore);

  readonly alerts = this.alertsStore.alerts;
}

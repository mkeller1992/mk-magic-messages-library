import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AlertsStore } from '../../state/alerts.store';
import { AlertComponent } from '../alert/alert.component';
import { AlertEntryAnimation } from '../../models/alert-entry-animation';
import { AlertAppearance } from '../../models/alert-appearance';

@Component({
  selector: 'magic-alerts',
  templateUrl: './alerts-container.component.html',
  styleUrls: ['./alerts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent]
})
export class AlertsContainerComponent {
  private readonly alertsStore = inject(AlertsStore);

  readonly entryAnimation = input<AlertEntryAnimation>(AlertEntryAnimation.DOT);
  readonly alertAppearance = input<AlertAppearance>(AlertAppearance.CLASSIC);

  readonly alerts = this.alertsStore.alerts;
}
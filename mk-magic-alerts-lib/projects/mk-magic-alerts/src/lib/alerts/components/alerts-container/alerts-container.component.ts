import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { AlertEntryAnimation } from '../../models/alert-entry-animation';
import { AlertAppearance } from '../../models/alert-appearance';
import { Alert } from '../../models/alert.model';

@Component({
  selector: 'magic-alerts',
  templateUrl: './alerts-container.component.html',
  styleUrls: ['./alerts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent]
})
export class AlertsContainerComponent {
  readonly entryAnimation = input<AlertEntryAnimation>(AlertEntryAnimation.DOT);
  readonly alertAppearance = input<AlertAppearance>(AlertAppearance.CLASSIC);
  readonly alerts = input<Alert[]>([]);
}

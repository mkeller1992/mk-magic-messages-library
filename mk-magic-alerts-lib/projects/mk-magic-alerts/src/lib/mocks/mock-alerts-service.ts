
import { AlertEntryAnimation } from '../alerts/models/alert-entry-animation';
import { AlertAppearance } from '../alerts/models/alert-appearance';

export class MockAlertsService {
  showInfo(text: string, dismissTimeInMillis: number = 10_000): void {}
  showSuccess(text: string, dismissTimeInMillis: number = 4_000): void {}
  showWarning(text: string, dismissTimeInMillis: number = 10_000): void {}
  showError(text: string, dismissTimeInMillis: number = 2_147_483_647): void {}
  setEntryAnimation(entryAnimation: AlertEntryAnimation): void {}
  setAlertAppearance(alertAppearance: AlertAppearance): void {}
  clear(): void {}
}

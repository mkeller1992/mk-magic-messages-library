import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { AlertEntryAnimation } from '../models/alert-entry-animation';

export interface MagicAlertsConfig {
  entryAnimation: AlertEntryAnimation;
}

export type MagicAlertsConfigOptions = Partial<MagicAlertsConfig>;

export const DEFAULT_MAGIC_ALERTS_CONFIG: MagicAlertsConfig = {
  entryAnimation: AlertEntryAnimation.DOT
};

export const MAGIC_ALERTS_CONFIG = new InjectionToken<MagicAlertsConfig>('MAGIC_ALERTS_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_MAGIC_ALERTS_CONFIG
});

export function provideMagicAlerts(config: MagicAlertsConfigOptions = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: MAGIC_ALERTS_CONFIG,
      useValue: {
        ...DEFAULT_MAGIC_ALERTS_CONFIG,
        ...config
      }
    }
  ]);
}

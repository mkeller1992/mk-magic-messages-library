import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { environment } from './environments/environment';
import { AlertEntryAnimation, provideMagicAlerts } from '@mk-magic-alerts';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, 
  {
    providers: [
		provideRouter(APP_ROUTES, withComponentInputBinding()),
		provideZonelessChangeDetection(),
		provideMagicAlerts({
			entryAnimation: AlertEntryAnimation.BURST
		})
    ]
  })
  .catch(err => console.error(err));

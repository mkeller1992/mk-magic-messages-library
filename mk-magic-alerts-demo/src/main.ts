import { enableProdMode, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, 
  {
    providers: [
		provideRouter(APP_ROUTES, withComponentInputBinding()),
		provideZonelessChangeDetection(),
    ]
  })
  .catch(err => console.error(err));

import { enableProdMode, importProvidersFrom } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, 
  {
    providers: [
      importProvidersFrom(),
      provideRouter(APP_ROUTES, withComponentInputBinding()),
      provideAnimations(),
    ]
  })
  .catch(err => console.error(err));

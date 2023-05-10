import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertsInitializerService } from './alerts-initializer.service';
import { AlertsComponent } from './alerts.component';
import { AlertComponent } from './core/alert/alert.component';
import { NewlineAndTabsPipe } from './core/pipes/new-line-and-tabs.pipe';


@NgModule({
  declarations: [
    AlertsComponent,
	  AlertComponent,
	  NewlineAndTabsPipe
  ],
  imports: [
	  CommonModule,
	  BrowserAnimationsModule,
  ],
  exports: [
  ],
  providers: [
    {
			provide: APP_INITIALIZER,
			deps: [AlertsInitializerService],
			useFactory: (startupClass: AlertsInitializerService) => () => startupClass.initializeAlertsComponent(),
			multi: true,
		},

  ]
})
export class MkMagicAlertsModule { }

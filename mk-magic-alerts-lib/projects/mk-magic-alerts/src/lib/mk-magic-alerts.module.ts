import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  ]
})
export class MkMagicAlertsModule { }

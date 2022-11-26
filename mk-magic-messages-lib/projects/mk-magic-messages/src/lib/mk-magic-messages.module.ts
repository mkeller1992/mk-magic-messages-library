import { NgModule } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertComponent } from './message-service/alerts/alert/alert.component';
import { AlertsContainerComponent } from './message-service/alerts/alerts-container.component';
import { DialogComponent } from './message-service/dialogs/dialog.component';
import { NewlineAndTabsPipe } from './message-service/pipes/new-line-and-tabs.pipe';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [
    MessagesComponent,
	AlertsContainerComponent,
	AlertComponent,
	DialogComponent,
	NewlineAndTabsPipe
  ],
  imports: [
	CommonModule,
	BrowserAnimationsModule,
	MatDialogModule
  ],
  exports: [
    MessagesComponent,
  ]
})
export class MkMagicMessagesModule { }

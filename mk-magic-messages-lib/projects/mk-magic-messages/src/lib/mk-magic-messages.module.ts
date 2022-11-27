import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './core/alert/alert.component';
import { DialogComponent } from './core/dialogs/dialog.component';
import { NewlineAndTabsPipe } from './core/pipes/new-line-and-tabs.pipe';
import { MessagesComponent } from './messages.component';
import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [
    MessagesComponent,
	AlertComponent,
	DialogComponent,
	NewlineAndTabsPipe
  ],
  imports: [
	CommonModule,
	BrowserAnimationsModule,
	MatDialogModule,
	MatButtonModule
  ],
  exports: [
    MessagesComponent
  ]
})
export class MkMagicMessagesModule { }

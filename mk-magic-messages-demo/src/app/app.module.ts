import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MkMagicMessagesModule } from '@mk-magic-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	MkMagicMessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

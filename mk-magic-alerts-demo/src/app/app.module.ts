import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MkMagicAlertsModule } from '@mk-magic-alerts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	BrowserAnimationsModule,
	MkMagicAlertsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

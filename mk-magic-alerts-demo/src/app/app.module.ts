import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    MkMagicAlertsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

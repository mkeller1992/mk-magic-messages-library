# Mk-Magic-Alerts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Installation

#### [npm](https://www.npmjs.com/package/mk-magic-alerts)
```
npm i mk-magic-alerts
```

## Quick Start


1. Add `MkMagicAlertsModule` to your module:
```
import { MkMagicAlertsModule } from 'mk-magic-alerts';

@NgModule({
  declarations: [],
  imports: [
	MkMagicAlertsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. Add the following code to the HTML-template of your `AppComponent`:
```
<magic-alerts></magic-alerts>
```

3. Import `AlertsService` in the component you want to display an alert:

```
import { AlertsService } from 'mk-magic-alerts';

constructor(private alertsSvc: AlertsService){}

ngOnInit(): void {
  const displayDurationInMillis = 3000;		
  this.alertsSvc.showError('Show me for 3 sec', displayDurationInMillis);

  this.alertsSvc.showError('Show me till user clicks exit');

  this.alertsSvc.showInfo('Info Alert');
  this.alertsSvc.showSuccess('Success Alert');
  this.alertsSvc.showWarning('Warn Alert');
}
```

4. To reset all active alerts, invoke the `clear()`-method:

```
this.alertsSvc.clear();
```
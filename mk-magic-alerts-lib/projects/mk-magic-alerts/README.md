# Mk-Magic-Alerts

Display animated success-, info-, warning- and error-alerts in your Angular application.

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
2. Import `AlertsService` in the component you want to display an alert:

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

3. To reset all active alerts, invoke the `clear()`-method:

```
this.alertsSvc.clear();
```
# Mk-Magic-Alerts

[![npm version](https://badge.fury.io/js/mk-magic-alerts.svg)](https://badge.fury.io/js/mk-magic-alerts)
![build status](https://github.com/mkeller1992/mk-magic-messages-library/actions/workflows/npm-publish.yml/badge.svg)
[![codecov](https://codecov.io/gh/mkeller1992/mk-magic-messages-library/graph/badge.svg?token=FZYEC8Y47D)](https://codecov.io/gh/mkeller1992/mk-magic-messages-library)

Display animated success-, info-, warning- and error-alerts in your Angular application.

The latest library version is compatible with **Angular 21**.
Starting with version 20.1.0, `mk-magic-alerts` is fully **zoneless-compatible**. 

---

## Demo
https://mkeller1992.github.io/mk-magic-messages-library

---

## Install

#### [npm](https://www.npmjs.com/package/mk-magic-alerts)
```
npm i mk-magic-alerts
```

## Setup

### For apps based on `Standalone Components`
Make sure `provideAnimations()` is included in your `main.ts`:
```typescript
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(),
		provideRouter(APP_ROUTES),
		provideAnimations() // this is required!
	]
}).catch(err => console.error(err));
```

### For apps based on `ngModule`
Make sure `BrowserAnimationsModule` is included in your `@NgModule`:
```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule // this is required!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage
1. Inject `AlertsService` into your component to invoke different kind of alerts as shown below:

```typescript
import { AlertsService } from 'mk-magic-alerts';

private readonly alertsSvc = inject(AlertsService);

ngOnInit(): void {
  const displayDurationInMillis = 3000;		
  this.alertsSvc.showError('Show me for 3 sec', displayDurationInMillis);

  this.alertsSvc.showError('Show me till user clicks exit');

  this.alertsSvc.showInfo('Info Alert');
  this.alertsSvc.showSuccess('Success Alert');
  this.alertsSvc.showWarning('Warn Alert');
}
```

2. To remove all active alerts, invoke the `clear()`-method:

```typescript
this.alertsSvc.clear();
```

## Mocking AlertsService for Unit Testing

To facilitate unit testing of components and services that depend on `AlertsService`, our library provides a `MockAlertsService`. This mock implementation offers empty methods corresponding to those of the actual `AlertsService`, allowing you to easily spy on them and control their behavior in your tests without having to worry about their real implementations.

### Usage

1. **Import the Mock Service**: First, ensure that the `MockAlertsService` is imported into your test file.

    ```typescript
    import { MockAlertsService } from 'mk-magic-alerts';
    ```

2. **Configure TestBed**: Use `MockAlertsService` to replace `AlertsService` in your TestBed configuration. This is done by providing it in the `providers` array of your test module setup.

    ```typescript
    TestBed.configureTestingModule({
      // Other configuration...
      providers: [
        { provide: AlertsService, useClass: MockAlertsService }
      ]
    });
    ```

    Alternatively, if you prefer to directly instantiate and provide the mock without Angular's dependency injection, you can create an instance of the mock and use `useValue`:

    ```typescript
    const mockAlertsService = new MockAlertsService();
    TestBed.configureTestingModule({
      // Other configuration...
      providers: [
        { provide: AlertsService, useValue: mockAlertsService }
      ]
    });
    ```

3. **Spying on Methods**: In your tests, you can now spy on the `MockAlertsService` methods using Jest's `spyOn` method. This allows you to mock return values, verify that the methods were called, and inspect the arguments passed to them.

    ```typescript
    it('should call showInfo method', () => {
      // Assuming you're inside a describe block for a component or service
      const alertsService = TestBed.inject(AlertsService);
      const showInfoSpy = jest.spyOn(alertsService, 'showInfo');
      // Trigger the action that results in showInfo being called
      expect(showInfoSpy).toHaveBeenCalledWith('Expected text', 10000);
    });
    ```
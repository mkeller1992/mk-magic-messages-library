import { Component, Input, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';
import { AlertComponent } from '../alert/alert.component';
import { AlertsContainerComponent } from './alerts-container.component';
import { AlertsStore } from '../../state/alerts.store';
import { AlertState } from '../../models/alert-state';
import { Alert } from '../../models/alert.model';
import { AlertEntryAnimation } from '../../models/alert-entry-animation';
import { AlertAppearance } from '../../models/alert-appearance';

@Component({
  selector: 'app-alert', // Has to equal the selector of the real AlertComponent
  template: '<div></div>'
})
class MockAlertComponent {
  @Input({ required: true })
  alertParams!: Alert;

  @Input()
  dismissTimeInMillis = 0;

  @Input()
  entryAnimation = AlertEntryAnimation.DOT;

  @Input()
  alertAppearance = AlertAppearance.CLASSIC;
}

describe('AlertsContainerComponent', () => {
  let component: AlertsContainerComponent;
  let fixture: ComponentFixture<AlertsContainerComponent>;

  const infoAlertTxt = 'Info Alert';
  const errorAlertTxt = 'Error Alert';

  const alerts: Alert[] = [
    {
      id: 'alert-1',
      text: infoAlertTxt,
      type: 'info',
      dismissTimeInMillis: 1000,
      state: AlertState.DISPLAY
    },
    {
      id: 'alert-2',
      text: errorAlertTxt,
      type: 'error',
      dismissTimeInMillis: 500,
      state: AlertState.DISPLAY
    }
  ];

  const alertsStoreMock: Partial<AlertsStore> = {
    alerts: signal(alerts)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsContainerComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AlertsStore, useValue: alertsStoreMock }
      ]
    })
      .overrideComponent(AlertsContainerComponent, {
        remove: {
          imports: [AlertComponent]
        },
        add: {
          imports: [MockAlertComponent]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AlertsContainerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject alerts from AlertsStore', () => {
    expect(component.alerts).toBeDefined();
    expect(component.alerts()).toEqual(alerts);
  });

  it('should render one AlertComponent per alert', () => {
    const alertComponents = fixture.debugElement.queryAll(By.directive(MockAlertComponent));

    expect(alertComponents).toHaveLength(2);
  });

  it('should pass alertParams to child alert components', () => {
    const alertComponents = fixture.debugElement.queryAll(By.directive(MockAlertComponent));

    const firstAlertComponent = alertComponents[0].componentInstance as MockAlertComponent;
    const secondAlertComponent = alertComponents[1].componentInstance as MockAlertComponent;

    expect(firstAlertComponent.alertParams).toEqual(alerts[0]);
    expect(secondAlertComponent.alertParams).toEqual(alerts[1]);
  });

  it('should pass entryAnimation to child alert components', () => {
    fixture.componentRef.setInput('entryAnimation', AlertEntryAnimation.DROP);
    fixture.detectChanges();

    const alertComponents = fixture.debugElement.queryAll(By.directive(MockAlertComponent));

    const firstAlertComponent = alertComponents[0].componentInstance as MockAlertComponent;
    const secondAlertComponent = alertComponents[1].componentInstance as MockAlertComponent;

    expect(firstAlertComponent.entryAnimation).toBe(AlertEntryAnimation.DROP);
    expect(secondAlertComponent.entryAnimation).toBe(AlertEntryAnimation.DROP);
  });

  it('should pass alertAppearance to child alert components', () => {
    fixture.componentRef.setInput('alertAppearance', AlertAppearance.GRADIENT);
    fixture.detectChanges();

    const alertComponents = fixture.debugElement.queryAll(By.directive(MockAlertComponent));

    const firstAlertComponent = alertComponents[0].componentInstance as MockAlertComponent;
    const secondAlertComponent = alertComponents[1].componentInstance as MockAlertComponent;

    expect(firstAlertComponent.alertAppearance).toBe(AlertAppearance.GRADIENT);
    expect(secondAlertComponent.alertAppearance).toBe(AlertAppearance.GRADIENT);
  });

});

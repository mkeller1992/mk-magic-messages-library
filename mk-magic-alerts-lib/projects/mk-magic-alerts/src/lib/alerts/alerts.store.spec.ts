import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AlertsStore } from './alerts.store';
import { AlertState } from './models/alert-state';

describe('AlertsStore', () => {
  let service: AlertsStore;

  beforeEach(() => {
    vi.useFakeTimers();

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AlertsStore
      ]
    });

    service = TestBed.inject(AlertsStore);
  });

  afterEach(() => {
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create correct alerts', () => {
    // Arrange
    const successTxt = 'This is a success-text';
    const infoTxt = 'This is a info-text';
    const warningTxt = 'This is a warning-text';
    const errorTxt = 'This is a error-text';

    // Act
    service.addAlert(successTxt, 'success', 500);
    service.addAlert(infoTxt, 'info', 600);
    service.addAlert(warningTxt, 'warning', 700);
    service.addAlert(errorTxt, 'error', 800);

    // Flush the auditTime(100)
    // Corresponds to the value of auditTime() in the alerts-pipe
    vi.advanceTimersByTime(100);

    const alerts = service.alerts();

    // Assert
    expect(alerts).toHaveLength(4);

    expect(alerts[0]).toEqual({
      id: 'alert-1',
      text: successTxt,
      type: 'success',
      dismissTimeInMillis: 500,
      state: AlertState.DISPLAY
    });

    expect(alerts[1]).toEqual({
      id: 'alert-2',
      text: infoTxt,
      type: 'info',
      dismissTimeInMillis: 600,
      state: AlertState.DISPLAY
    });

    expect(alerts[2]).toEqual({
      id: 'alert-3',
      text: warningTxt,
      type: 'warning',
      dismissTimeInMillis: 700,
      state: AlertState.DISPLAY
    });

    expect(alerts[3]).toEqual({
      id: 'alert-4',
      text: errorTxt,
      type: 'error',
      dismissTimeInMillis: 800,
      state: AlertState.DISPLAY
    });
  });

  it('should increment alert ids', () => {
    // Act
    service.addAlert('First Alert', 'info', 1000);
    service.addAlert('Second Alert', 'error', 1000);

    vi.advanceTimersByTime(100);

    const alerts = service.alerts();

    // Assert
    expect(alerts[0].id).toBe('alert-1');
    expect(alerts[1].id).toBe('alert-2');
  });

  it('should remove dismissed alerts before adding a new alert', () => {
    // Arrange
    service.addAlert('Dismissed Alert', 'info', 1000);

    vi.advanceTimersByTime(100);

    const firstAlert = service.alerts()[0];
    firstAlert.state = AlertState.DISMISSED;

    // Act
    service.addAlert('New Alert', 'success', 2000);

    vi.advanceTimersByTime(100);

    const alerts = service.alerts();

    // Assert
    expect(alerts).toHaveLength(1);
    expect(alerts[0].text).toBe('New Alert');
    expect(alerts[0].type).toBe('success');
    expect(alerts[0].state).toBe(AlertState.DISPLAY);
  });

  it('should emit from dismissAll$ when dismissAll is called', () => {
    // Arrange
    const callback = vi.fn();

    const sub = service.dismissAll$.subscribe(callback);

    // Act
    service.dismissAll();

    // Assert
    expect(callback).toHaveBeenCalledTimes(1);

    sub.unsubscribe();
  });
});
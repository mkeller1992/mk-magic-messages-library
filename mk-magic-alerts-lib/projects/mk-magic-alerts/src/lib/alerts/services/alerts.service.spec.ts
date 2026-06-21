import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { AlertsService } from './alerts.service';
import { AlertsStore } from '../state/alerts.store';
import { Alert } from '../models/alert.model';

describe('AlertsService', () => {
  let service: AlertsService;
  let alertsStoreMock: Partial<AlertsStore>;

  beforeEach(() => {
    alertsStoreMock = {
      alerts: signal<Alert[]>([]),
      addAlert: vi.fn(),
      dismissAll: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: AlertsStore, useValue: alertsStoreMock },
        AlertsService
      ]
    });

    service = TestBed.inject(AlertsService);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  describe('info', () => {
    it('should call addAlert with info type and custom dismiss time', () => {
      const text = 'Info message';
      const dismissTimeInMillis = 12345;

      service.showInfo(text, dismissTimeInMillis);

      expect(alertsStoreMock.addAlert).toHaveBeenCalledWith(text, 'info', dismissTimeInMillis);
    });

    it('should call addAlert with info type and default dismiss time', () => {
      const text = 'Info message';

      service.showInfo(text);

      expect(alertsStoreMock.addAlert).toHaveBeenCalledWith(text, 'info', 10_000);
    });
  });

  describe('success', () => {
    it('should call addAlert with success type and custom dismiss time', () => {
      const text = 'Success message';
      const dismissTimeInMillis = 12345;

      service.showSuccess(text, dismissTimeInMillis);

      expect(alertsStoreMock.addAlert).toHaveBeenCalledWith(text, 'success', dismissTimeInMillis);
    });

    it('should call addAlert with success type and default dismiss time', () => {
      const text = 'Success message';

      service.showSuccess(text);

      expect(alertsStoreMock.addAlert).toHaveBeenCalledWith(text, 'success', 4_000);
    });
  });

  describe('warning', () => {
    it('should call addAlert with warning type and custom dismiss time', () => {
      const text = 'Warning message';
      const dismissTimeInMillis = 12345;

      service.showWarning(text, dismissTimeInMillis);

      expect(alertsStoreMock.addAlert).toHaveBeenCalledWith(text, 'warning', dismissTimeInMillis);
    });

    it('should call addAlert with warning type and default dismiss time', () => {
      const text = 'Warning message';

      service.showWarning(text);

      expect(alertsStoreMock.addAlert).toHaveBeenCalledWith(text, 'warning', 10_000);
    });
  });

  describe('error', () => {
    it('should call addAlert with error type and custom dismiss time', () => {
      const text = 'Error message';
      const dismissTimeInMillis = 12345;

      service.showError(text, dismissTimeInMillis);

      expect(alertsStoreMock.addAlert).toHaveBeenCalledWith(text, 'error', dismissTimeInMillis);
    });

    it('should call addAlert with error type and default dismiss time', () => {
      const text = 'Error message';

      service.showError(text);

      expect(alertsStoreMock.addAlert).toHaveBeenCalledWith(text, 'error', 2_147_483_647);
    });
  });

  describe('clear', () => {
    it('should call dismissAll', () => {
      service.clear();

      expect(alertsStoreMock.dismissAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('initialization', () => {
    it('should create the alerts host element', () => {
      expect(document.body.children.length).toBeGreaterThan(0);
    });
  });
});

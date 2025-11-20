import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AlertsService } from './alerts.service';
import { AlertsStore } from './alerts.store';

describe('AlertsService', () => {
  let service: AlertsService;
  let alertsStoreServiceMock: jest.Mocked<Partial<AlertsStore>>;

  beforeEach(() => {
    alertsStoreServiceMock = {
      addAlert: jest.fn(),
      dismissAll: jest.fn(),
    };

    TestBed.configureTestingModule({
		providers: [
			provideZonelessChangeDetection(),
			{ provide: AlertsStore, useValue: alertsStoreServiceMock },
			AlertsService
		],
    });

    service = TestBed.inject(AlertsService);
  });

  describe('info', () => {
    it('should call addAlert with info type and custom dismiss time', () => {
      const text = 'Info message';
      const dismissTimeInMillis = 12345;
      service.showInfo(text, dismissTimeInMillis);
      expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'info', dismissTimeInMillis);
    });
  
    it('should call addAlert with info type and default dismiss time', () => {
      const text = 'Info message';
      service.showInfo(text);
      expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'info', 10_000);
    });
  });

  describe('success', () => {
    it('should call addAlert with success type and custom dismiss time', () => {
      const text = 'Success message';
      const dismissTimeInMillis = 12345;
      service.showSuccess(text, dismissTimeInMillis);
      expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'success', dismissTimeInMillis);
    });

    it('should call addAlert with success type and default dismiss time', () => {
      const text = 'Success message';
      service.showSuccess(text);
      expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'success', 4000);
    });
  });

  describe('warning', () => {
    it('should call addAlert with warning type and custom dismiss time', () => {
      const text = 'Warning message';
      const dismissTimeInMillis = 12345;
      service.showWarning(text, dismissTimeInMillis);
      expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'warning', dismissTimeInMillis);
    });

    it('should call addAlert with warning type and default dismiss time', () => {
      const text = 'Warning message';
      service.showWarning(text);
      expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'warning', 10_000);
    });
  });

  describe('error', () => {
    it('should call addAlert with error type and custom dismiss time', () => {
      const text = 'Error message';
      const dismissTimeInMillis = 12345;
      service.showError(text, dismissTimeInMillis);
      expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'error', dismissTimeInMillis);
    });

    it('should call addAlert with error type and default dismiss time', () => {
      const text = 'Error message';
      const dismissTimeInMillis = 2147483647; // Max integer value
      service.showError(text);
      expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'error', dismissTimeInMillis);
    });
  });

  describe('clear', () => {
    it('should call dismissAll', () => {
      service.clear();
      expect(alertsStoreServiceMock.dismissAll).toHaveBeenCalled();
    });
  });

});
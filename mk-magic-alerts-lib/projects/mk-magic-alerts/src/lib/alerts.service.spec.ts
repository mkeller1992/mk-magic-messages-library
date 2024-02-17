import { TestBed } from '@angular/core/testing';
import { AlertsService } from './alerts.service';
import { AlertsStoreService } from './alerts-store.service';

describe('AlertsService', () => {
  let service: AlertsService;
  let alertsStoreServiceMock: jest.Mocked<Partial<AlertsStoreService>>;

  beforeEach(() => {
    alertsStoreServiceMock = {
      addAlert: jest.fn(),
      dismissAll: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AlertsService,
        { provide: AlertsStoreService, useValue: alertsStoreServiceMock },
      ],
    });

    service = TestBed.inject(AlertsService);
  });

  it('should call addAlert with info type', () => {
    const text = 'Info message';
    const dismissTimeInMillis = 444;
    service.showInfo(text, dismissTimeInMillis);
    expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'info', dismissTimeInMillis);
  });

  it('should call addAlert with success type and default dismiss time', () => {
    const text = 'Success message';
    service.showSuccess(text);
    expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'success', 4000);
  });

  it('should call addAlert with warning type', () => {
    const text = 'Warning message';
    const dismissTimeInMillis = 555;
    service.showWarning(text, dismissTimeInMillis);
    expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'warning', dismissTimeInMillis);
  });

  it('should call addAlert with error type and default dismiss time', () => {
    const text = 'Error message';
    const dismissTimeInMillis = 2147483647; // Max integer value
    service.showError(text);
    expect(alertsStoreServiceMock.addAlert).toHaveBeenCalledWith(text, 'error', dismissTimeInMillis);
  });

  it('should call dismissAll', () => {
    service.clear();
    expect(alertsStoreServiceMock.dismissAll).toHaveBeenCalled();
  });
});
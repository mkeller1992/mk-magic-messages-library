import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertsStore } from "./alerts.store";
import { Alert } from './core/models/alert.model';

describe("AlertsStore", () => {
  let service: AlertsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should create correct messages', fakeAsync(() => {

    // Arrange
    const successTxt = 'This is a success-text';
    const infoTxt = 'This is a info-text';
    const warningTxt = 'This is a warning-text';
    const errorTxt = 'This is a error-text';
    const callback = jest.fn();

    // Assert
    service.alerts$.subscribe((messages: Alert[]) => {
      
      callback(); // make sure the subscribe section was hit

      expect(messages?.length).toBe(4);

      expect(messages[0].text).toBe(successTxt);          
      expect(messages[0].type).toBe('success');
      expect(messages[0].dismissTimeInMillis).toBe(500);

      expect(messages[1].text).toBe(infoTxt);          
      expect(messages[1].type).toBe('info');
      expect(messages[1].dismissTimeInMillis).toBe(600);

      expect(messages[2].text).toBe(warningTxt);          
      expect(messages[2].type).toBe('warning');
      expect(messages[2].dismissTimeInMillis).toBe(700);

      expect(messages[3].text).toBe(errorTxt);          
      expect(messages[3].type).toBe('error');
      expect(messages[3].dismissTimeInMillis).toBe(800);
    });

    // Act
    service.addAlert(successTxt, 'success', 500);
    service.addAlert(infoTxt, 'info', 600);
    service.addAlert(warningTxt, 'warning', 700);
    service.addAlert(errorTxt, 'error', 800);
    tick(100); // corresponds to the value of auditTime() in the alerts$-pipe

    expect(callback).toHaveBeenCalledTimes(1);
  }));

  it('should emit from dismissAll$ when dismissAll is called', () => {
    // Arrange
    const callback = jest.fn();

    // Act
    service.dismissAll$.subscribe(callback);
    service.dismissAll(); // This should trigger the emission we're subscribing to

    // Assert
    expect(callback).toHaveBeenCalledTimes(1);
  });

});

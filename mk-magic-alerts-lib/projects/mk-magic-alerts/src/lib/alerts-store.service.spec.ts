import { TestBed } from '@angular/core/testing';
import { AlertsStoreService } from "./alerts-store.service";
import { Alert } from './core/models/alert.model';

describe("AlertsStoreService", () => {
  let service: AlertsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should create correct messages', (done) => {

    // Arrange
    const successTxt = 'This is a success-text';
    const infoTxt = 'This is a info-text';
    const warningTxt = 'This is a warning-text';
    const errorTxt = 'This is a error-text';

    // Assert
    setTimeout(() => {
      service.alerts$.subscribe((messages: Alert[]) => {
        
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

          done();
      });
    }, 0);

      // Act
      service.addAlert(successTxt, 'success', 500);
      service.addAlert(infoTxt, 'info', 600);
      service.addAlert(warningTxt, 'warning', 700);
      service.addAlert(errorTxt, 'error', 800);
  });
});

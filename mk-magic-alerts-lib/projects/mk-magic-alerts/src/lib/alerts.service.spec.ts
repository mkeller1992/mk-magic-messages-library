import { TestBed } from '@angular/core/testing';

import { AlertsService } from './alerts.service';

describe('AlertsService', () => {
  let service: AlertsService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

/*
  it('messages should be emitted', (done) => {

    // Arrange

    // Act
    service.showInfo('Message', 1000);

    // Assert
    setTimeout(() => {
      service.messages$.subscribe((messages: Alert[]) => {
        expect(messages?.length).toBe(1);
        done();
      });
    }, 1);
  });
  */

});

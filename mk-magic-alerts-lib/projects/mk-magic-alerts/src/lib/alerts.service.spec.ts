import { TestBed } from '@angular/core/testing';
import { MatDialog } from "@angular/material/dialog";
import { Alert } from "./core/models/alert.model";

import { AlertsService } from './alerts.service';

describe('AlertsService', () => {
  let service: AlertsService;
  let mockMatDialog: MatDialog;

  beforeEach(() => {

    mockMatDialog = jasmine.createSpyObj(['open']);

    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: mockMatDialog }],
    });

    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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

});

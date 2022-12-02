import { TestBed } from '@angular/core/testing';
import { MatDialog } from "@angular/material/dialog";
import { Message } from "./core/models/message.model";

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;
  let mockMatDialog: MatDialog;

  beforeEach(() => {

    mockMatDialog = jasmine.createSpyObj(['open']);

    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: mockMatDialog }],
    });

    service = TestBed.inject(MessagesService);
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
      service.messages$.subscribe((messages: Message[]) => {
        expect(messages?.length).toBe(1);
        done();
      });
    }, 1);
  });

});

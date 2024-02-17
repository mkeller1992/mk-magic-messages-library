import { ApplicationRef, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AlertsInitializerService } from './alerts-initializer.service';

describe('AlertsInitializerService', () => {
    let service: AlertsInitializerService;
  
    beforeEach(() => {

        const mockApplicationRef = {
            attachView: jest.fn(),
            detachView: jest.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                AlertsInitializerService,
                { provide: ApplicationRef, useValue: mockApplicationRef },
                { provide: Injector, useValue: {} },
            ],
        });
    
        service = TestBed.inject(AlertsInitializerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
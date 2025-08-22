import { TestBed } from '@angular/core/testing';
import { AlertsStore } from "./alerts.store";
import { Alert } from './models/alert.model';
import { provideZonelessChangeDetection } from '@angular/core';

describe("AlertsStore", () => {
  let service: AlertsStore;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ provideZonelessChangeDetection() ]
		});
		service = TestBed.inject(AlertsStore);
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should create correct messages', () => {
		// Arrange
		const successTxt = 'This is a success-text';
		const infoTxt    = 'This is a info-text';
		const warningTxt = 'This is a warning-text';
		const errorTxt   = 'This is a error-text';

		const callback = jest.fn();
		let received: Alert[] | undefined;

		const sub = service.alerts$.subscribe(msgs => {
			received = msgs;
			callback();
		});

		// Act
		service.addAlert(successTxt, 'success', 500);
		service.addAlert(infoTxt,    'info',    600);
		service.addAlert(warningTxt, 'warning', 700);
		service.addAlert(errorTxt,   'error',   800);

		// Flush the auditTime(100)
		// corresponds to the value of auditTime() in the alerts$-pipe
		jest.advanceTimersByTime(100);

		// Assert
		expect(callback).toHaveBeenCalledTimes(1);
		expect(received).toBeTruthy();
		expect(received!.length).toBe(4);

		expect(received![0].text).toBe(successTxt);
		expect(received![0].type).toBe('success');
		expect(received![0].dismissTimeInMillis).toBe(500);

		expect(received![1].text).toBe(infoTxt);
		expect(received![1].type).toBe('info');
		expect(received![1].dismissTimeInMillis).toBe(600);

		expect(received![2].text).toBe(warningTxt);
		expect(received![2].type).toBe('warning');
		expect(received![2].dismissTimeInMillis).toBe(700);

		expect(received![3].text).toBe(errorTxt);
		expect(received![3].type).toBe('error');
		expect(received![3].dismissTimeInMillis).toBe(800);

		sub.unsubscribe();
  	});

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

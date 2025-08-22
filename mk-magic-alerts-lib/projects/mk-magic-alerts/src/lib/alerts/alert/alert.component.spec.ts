import { ChangeDetectorRef, ElementRef, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { AlertsStore } from '../alerts.store';
import { AlertState } from '../models/alert-state';
import { Alert } from '../models/alert.model';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
	let component: AlertComponent;
	let fixture: ComponentFixture<AlertComponent>;
	let mockAlertsStoreService: Partial<AlertsStore>;
	let mockElementRef: Partial<ElementRef>;
	let dismissAllSubject: Subject<void>;

	beforeEach(async () => {

		dismissAllSubject = new Subject<void>();

		mockAlertsStoreService = {
			dismissAll$: dismissAllSubject.asObservable(),
		};

		mockElementRef = {
			nativeElement: {
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			},
		};

		await TestBed.configureTestingModule({
		imports: [AlertComponent],
		providers: [
			provideZonelessChangeDetection(),
			{ provide: ElementRef, useValue: mockElementRef },
			{ provide: AlertsStore, useValue: mockAlertsStoreService },
			ChangeDetectorRef,
		]
		}).compileComponents();

		fixture = TestBed.createComponent(AlertComponent);
		component = fixture.componentInstance;

		component.alertParams = new Alert('Test Alert', 'info', 2000);
		component.dismissTimeInMillis = 2000;
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should create', () => {
		// Act
		fixture.detectChanges();

		// Assert
		expect(component).toBeTruthy();
	});

	it('dismisses after timeout and becomes DISMISSED on transition end', () => {
		jest.useFakeTimers();

		const dismissTimeInMillis = 3000;
		component.alertParams = new Alert('Test Alert', 'info', dismissTimeInMillis);
		component.dismissTimeInMillis = dismissTimeInMillis;

		const setDismissalStartSpy = jest.spyOn(component, 'setDismissalStart');

		// kick off ngOnInit subscriptions
		fixture.detectChanges();

		// fast-forward the dismissal timer
		jest.advanceTimersByTime(dismissTimeInMillis);

		// after the timer, we should be transitioning out (DISMISS)
		expect(setDismissalStartSpy).toHaveBeenCalledTimes(1);
		expect(component.alertParams.state).toBe(AlertState.DISMISS);

		// simulate the end of the CSS transition to finalize as DISMISSED
		component.onContainerTransitionEnd({ propertyName: 'opacity' } as unknown as TransitionEvent);
		// (or: { propertyName: 'opacity' })

		expect(component.alertParams.state).toBe(AlertState.DISMISSED);

		jest.useRealTimers();
	});

	it('should dismiss alert when dismissAll$ was called', () => {
		// Arrange
		const setDismissalStartSpy = jest.spyOn(component, 'setDismissalStart');

		// Act
		fixture.detectChanges();
		dismissAllSubject.next();

		// Assert
		expect(setDismissalStartSpy).toHaveBeenCalledTimes(1);
	});

	it('should dismiss alert on mouseup', () => {
		// Arrange
		const setDismissalStartSpy = jest.spyOn(component, 'setDismissalStart');

		// Act
		fixture.detectChanges();
		fixture.nativeElement.dispatchEvent(new Event('mouseup'));

		// Assert
		expect(setDismissalStartSpy).toHaveBeenCalledTimes(1);
	});

	it('should extend display-time of alert on mouseleave', () => {
		// Arrange
		jest.useFakeTimers();
		const dismissTimeInMillis = 4000;
		component.alertParams = new Alert('Test Alert', 'info', dismissTimeInMillis);
		component.dismissTimeInMillis = dismissTimeInMillis;
		const setDismissalStartSpy = jest.spyOn(component, 'setDismissalStart');

		// Act
		fixture.detectChanges();
		jest.advanceTimersByTime(3000);
		fixture.nativeElement.dispatchEvent(new Event('mouseenter'));
		fixture.nativeElement.dispatchEvent(new Event('mouseleave'));
		jest.advanceTimersByTime(1000);

		// Assert
		// after altogether 4 sec the alert should not yet be dismissed,
		// because mouseleave should have extended the display-time by another 4 sec:
		expect(setDismissalStartSpy).toHaveBeenCalledTimes(0);

		// Act
		jest.advanceTimersByTime(3000);

		// Assert
		// 4 sec after mouseleave (1000 + 3000 ms) the alert should be dismissed:
		expect(setDismissalStartSpy).toHaveBeenCalledTimes(1);
	});

	it('should *not* dismiss alert as long as mouse is placed above alert', () => {
		// Arrange
		jest.useFakeTimers();
		const setDismissalStartSpy = jest.spyOn(component, 'setDismissalStart');

		// Act
		fixture.detectChanges();
		fixture.nativeElement.dispatchEvent(new Event('mouseenter'));
		jest.advanceTimersByTime(100_000);

		// Assert
		expect(setDismissalStartSpy).toHaveBeenCalledTimes(0);
	});

	it('should set alert state to DISMISS when dismissal starts', () => {
		// Act
		component.setDismissalStart();

		// Assert
		expect(component.alertParams.state).toBe(AlertState.DISMISS);
	});

	it('should update alert state to DISMISSED after leave transition ends', () => {
		// Arrange: component is in the middle of dismissing
		component.alertParams = { state: AlertState.DISMISS } as any;

		// Act: simulate the relevant CSS transition finishing
		const evt = { propertyName: 'opacity' } as unknown as TransitionEvent;
		component.onContainerTransitionEnd(evt);

		// Assert
		expect(component.alertParams.state).toBe(AlertState.DISMISSED);
	});

	it('should clean up subscriptions on destroy', () => {
		// Arrange
		const unsubscribeSpy = jest.spyOn(component['destroy$'], 'complete');

		// Act
		fixture.detectChanges();
		fixture.destroy();

		// Assert
		expect(unsubscribeSpy).toHaveBeenCalled();
	});

});

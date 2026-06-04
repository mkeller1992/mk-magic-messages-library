import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AlertsStore } from '../alerts.store';
import { AlertState } from '../models/alert-state';
import { Alert } from '../models/alert.model';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let dismissAllSubject: Subject<void>;

  function createAlert(dismissTimeInMillis = 2000): Alert {
    return {
      id: 'alert-1',
      text: 'Test Alert',
      type: 'info',
      dismissTimeInMillis,
      state: AlertState.DISPLAY
    };
  }

  beforeEach(async () => {
    dismissAllSubject = new Subject<void>();

    await TestBed.configureTestingModule({
      imports: [AlertComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: AlertsStore,
          useValue: {
            dismissAll$: dismissAllSubject.asObservable()
          } satisfies Partial<AlertsStore>
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('alertParams', createAlert());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('dismisses after timeout and becomes DISMISSED on transition end', () => {
    // Arrange
    vi.useFakeTimers();

    const dismissTimeInMillis = 3000;

    fixture.componentRef.setInput('alertParams', createAlert(dismissTimeInMillis));

    const setDismissalStartSpy = vi.spyOn(component, 'setDismissalStart');

    // Act
    fixture.detectChanges();
    vi.advanceTimersByTime(dismissTimeInMillis);

    // Assert
    expect(setDismissalStartSpy).toHaveBeenCalledTimes(1);
    expect(component.state()).toBe(AlertState.DISMISS);

    // Act
    component.onContainerTransitionEnd({ propertyName: 'opacity' } as TransitionEvent);

    // Assert
    expect(component.state()).toBe(AlertState.DISMISSED);
  });

  it('should dismiss alert when dismissAll$ was called', () => {
    // Arrange
    const setDismissalStartSpy = vi.spyOn(component, 'setDismissalStart');

    // Act
    fixture.detectChanges();
    dismissAllSubject.next();

    // Assert
    expect(setDismissalStartSpy).toHaveBeenCalledTimes(1);
    expect(component.state()).toBe(AlertState.DISMISS);
  });

  it('should dismiss alert on mouseup', () => {
    // Arrange
    const setDismissalStartSpy = vi.spyOn(component, 'setDismissalStart');

    // Act
    fixture.detectChanges();
    fixture.nativeElement.dispatchEvent(new Event('mouseup'));

    // Assert
    expect(setDismissalStartSpy).toHaveBeenCalledTimes(1);
    expect(component.state()).toBe(AlertState.DISMISS);
  });

  it('should extend display-time of alert on mouseleave', () => {
    // Arrange
    vi.useFakeTimers();

    const dismissTimeInMillis = 4000;

    fixture.componentRef.setInput('alertParams', createAlert(dismissTimeInMillis));

    const setDismissalStartSpy = vi.spyOn(component, 'setDismissalStart');

    // Act
    fixture.detectChanges();

    vi.advanceTimersByTime(3000);

    fixture.nativeElement.dispatchEvent(new Event('mouseenter'));
    fixture.nativeElement.dispatchEvent(new Event('mouseleave'));

    vi.advanceTimersByTime(1000);

    // Assert
    // After altogether 4 sec the alert should not yet be dismissed,
    // because mouseleave should have extended the display-time by another 4 sec:
    expect(setDismissalStartSpy).toHaveBeenCalledTimes(0);

    // Act
    vi.advanceTimersByTime(3000);

    // Assert
    // 4 sec after mouseleave (1000 + 3000 ms) the alert should be dismissed:
    expect(setDismissalStartSpy).toHaveBeenCalledTimes(1);
    expect(component.state()).toBe(AlertState.DISMISS);
  });

  it('should *not* dismiss alert as long as mouse is placed above alert', () => {
    // Arrange
    vi.useFakeTimers();

    const setDismissalStartSpy = vi.spyOn(component, 'setDismissalStart');

    // Act
    fixture.detectChanges();

    fixture.nativeElement.dispatchEvent(new Event('mouseenter'));
    vi.advanceTimersByTime(100_000);

    // Assert
    expect(setDismissalStartSpy).toHaveBeenCalledTimes(0);
    expect(component.state()).toBe(AlertState.DISPLAY);
  });

  it('should set alert state to DISMISS when dismissal starts', () => {
    // Act
    fixture.detectChanges();
    component.setDismissalStart();

    // Assert
    expect(component.state()).toBe(AlertState.DISMISS);
  });

  it('should update alert state to DISMISSED after leave transition ends', () => {
    // Arrange
    component.state.set(AlertState.DISMISS);

    // Act
    component.onContainerTransitionEnd({ propertyName: 'opacity' } as TransitionEvent);

    // Assert
    expect(component.state()).toBe(AlertState.DISMISSED);
  });

  it('should ignore irrelevant transition properties', () => {
    // Arrange
    component.state.set(AlertState.DISMISS);

    // Act
    component.onContainerTransitionEnd({ propertyName: 'color' } as TransitionEvent);

    // Assert
    expect(component.state()).toBe(AlertState.DISMISS);
  });

  it('should clean up subscriptions on destroy', () => {
    // Arrange
    const setDismissalStartSpy = vi.spyOn(component, 'setDismissalStart');

    fixture.detectChanges();

    // Act
    fixture.destroy();
    dismissAllSubject.next();

    // Assert
    expect(setDismissalStartSpy).toHaveBeenCalledTimes(0);
  });
});

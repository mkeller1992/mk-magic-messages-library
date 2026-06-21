import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertEntryAnimation, AlertsService, MockAlertsService } from '@mk-magic-alerts';
import { AppComponent } from './app.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAlertsService: AlertsService;

  beforeEach(async () => {

    // Suppress console.logs
    vi.spyOn(console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
		provideZonelessChangeDetection(),
        { provide: AlertsService, useClass: MockAlertsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    mockAlertsService = TestBed.inject(AlertsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers(); // Clean up and use real timers after tests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AlertsService methods on ngOnInit', () => {
    vi.useFakeTimers();

    const showSuccessSpy = vi.spyOn(mockAlertsService, 'showSuccess');
    const showErrorSpy = vi.spyOn(mockAlertsService, 'showError');
    const showInfoSpy = vi.spyOn(mockAlertsService, 'showInfo');
    const showWarningSpy = vi.spyOn(mockAlertsService, 'showWarning');

    component.ngOnInit();

    // No need to advance time for the synchronous call to showSuccess, which should be checked directly
    expect(showSuccessSpy).toHaveBeenCalledWith('Success-Alert', 5_000);

    // Advance timers just enough for the first setTimeout to trigger
    vi.advanceTimersByTime(500);
    expect(showErrorSpy).toHaveBeenCalledWith('Error-Alert', 5_000);

    // Advance timers to trigger the second setTimeout
    vi.advanceTimersByTime(500);
    expect(showInfoSpy).toHaveBeenCalledWith('Info-Alert', 5_000);
    // Advance timers for the third setTimeout
    vi.advanceTimersByTime(500);
    expect(showWarningSpy).toHaveBeenCalledWith('Warning-Alert', 5_000);
  });

  it('should display an alert with the selected entry animation', () => {
    const setEntryAnimationSpy = vi.spyOn(mockAlertsService, 'setEntryAnimation');
    const showInfoSpy = vi.spyOn(mockAlertsService, 'showInfo');

    component.alertsForm.patchValue({
      entryAnimation: AlertEntryAnimation.UNFOLD
    });

    component.submitSelectedAnimation();

    expect(setEntryAnimationSpy).toHaveBeenCalledWith(AlertEntryAnimation.UNFOLD);
    expect(showInfoSpy).toHaveBeenCalledWith('Entry animation: Unfold', 4_000);
  });

  it('should display all entry animations', () => {
    vi.useFakeTimers();

    const setEntryAnimationSpy = vi.spyOn(mockAlertsService, 'setEntryAnimation');
    const showInfoSpy = vi.spyOn(mockAlertsService, 'showInfo');

    component.submitAllEntryAnimations();
    vi.runAllTimers();

    expect(setEntryAnimationSpy).toHaveBeenCalledWith(AlertEntryAnimation.DOT);
    expect(setEntryAnimationSpy).toHaveBeenCalledWith(AlertEntryAnimation.BURST);
    expect(setEntryAnimationSpy).toHaveBeenCalledWith(AlertEntryAnimation.DROP);
    expect(setEntryAnimationSpy).toHaveBeenCalledWith(AlertEntryAnimation.SLIDE_RIGHT);
    expect(setEntryAnimationSpy).toHaveBeenCalledWith(AlertEntryAnimation.UNFOLD);
    expect(showInfoSpy).toHaveBeenCalledTimes(5);
  });
});

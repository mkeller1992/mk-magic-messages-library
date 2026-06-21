import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertAppearance, AlertEntryAnimation, AlertsService, MockAlertsService } from '@mk-magic-alerts';
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
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call AlertsService methods on ngOnInit', () => {
    vi.useFakeTimers();

    const showSuccessSpy = vi.spyOn(mockAlertsService, 'showSuccess');
    const showErrorSpy = vi.spyOn(mockAlertsService, 'showError');
    const showInfoSpy = vi.spyOn(mockAlertsService, 'showInfo');
    const showWarningSpy = vi.spyOn(mockAlertsService, 'showWarning');
    const setAlertAppearanceSpy = vi.spyOn(mockAlertsService, 'setAlertAppearance');

    fixture.detectChanges();

    expect(setAlertAppearanceSpy).toHaveBeenCalledWith(AlertAppearance.CLASSIC);
    expect(showSuccessSpy).toHaveBeenCalledWith('Success-Alert', 5_000);

    vi.advanceTimersByTime(1_000);
    expect(showErrorSpy).toHaveBeenCalledWith('Error-Alert', 5_000);

    vi.advanceTimersByTime(1_000);
    expect(showInfoSpy).toHaveBeenCalledWith('Info-Alert', 5_000);

    vi.advanceTimersByTime(1_000);
    expect(showWarningSpy).toHaveBeenCalledWith('Warning-Alert', 5_000);
  });

  it('should display an alert with the selected entry animation', () => {
    vi.useFakeTimers();
    fixture.detectChanges();
    vi.clearAllTimers();

    const setEntryAnimationSpy = vi.spyOn(mockAlertsService, 'setEntryAnimation');
    const setAlertAppearanceSpy = vi.spyOn(mockAlertsService, 'setAlertAppearance');
    const showInfoSpy = vi.spyOn(mockAlertsService, 'showInfo');

    component.alertsForm.patchValue({
      entryAnimation: AlertEntryAnimation.UNFOLD,
      gradientAppearance: true
    });

    component.submitSelectedAnimation();

    expect(setEntryAnimationSpy).toHaveBeenCalledWith(AlertEntryAnimation.UNFOLD);
    expect(setAlertAppearanceSpy).toHaveBeenCalledWith(AlertAppearance.GRADIENT);
    expect(showInfoSpy).toHaveBeenCalledWith('Entry animation: Unfold', 4_000);
  });

  it('should display an alert with the selected appearance', () => {
    vi.useFakeTimers();
    fixture.detectChanges();
    vi.clearAllTimers();

    const setAlertAppearanceSpy = vi.spyOn(mockAlertsService, 'setAlertAppearance');
    const showInfoSpy = vi.spyOn(mockAlertsService, 'showInfo');

    component.alertsForm.patchValue({
      gradientAppearance: true
    });

    component.submitSelectedAppearance();

    expect(setAlertAppearanceSpy).toHaveBeenCalledWith(AlertAppearance.GRADIENT);
    expect(showInfoSpy).toHaveBeenCalledWith('Alert appearance: Gradient', 4_000);
  });

  it('should display all entry animations', () => {
    vi.useFakeTimers();
    fixture.detectChanges();
    vi.clearAllTimers();

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
    expect(showInfoSpy).toHaveBeenCalledWith('Entry animation: Dot', 7_000);
    expect(showInfoSpy).toHaveBeenCalledWith('Entry animation: Burst', 7_000);
    expect(showInfoSpy).toHaveBeenCalledWith('Entry animation: Drop', 7_000);
    expect(showInfoSpy).toHaveBeenCalledWith('Entry animation: Slide right', 7_000);
    expect(showInfoSpy).toHaveBeenCalledWith('Entry animation: Unfold', 7_000);
  });

});

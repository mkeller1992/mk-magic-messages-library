import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsService, MockAlertsService } from '@mk-magic-alerts';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAlertsService: AlertsService;

  beforeEach(async () => {

    // Suppress console.logs
    jest.spyOn(console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AlertsService, useClass: MockAlertsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    mockAlertsService = TestBed.inject(AlertsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers(); // Clean up and use real timers after tests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AlertsService methods on ngOnInit', () => {
    jest.useFakeTimers();

    const showSuccessSpy = jest.spyOn(mockAlertsService, 'showSuccess');
    const showErrorSpy = jest.spyOn(mockAlertsService, 'showError');
    const showInfoSpy = jest.spyOn(mockAlertsService, 'showInfo');
    const showWarningSpy = jest.spyOn(mockAlertsService, 'showWarning');

    component.ngOnInit();

    // No need to advance time for the synchronous call to showSuccess, which should be checked directly
    expect(showSuccessSpy).toHaveBeenCalledWith('Success-Alert', 5_000);

    // Advance timers just enough for the first setTimeout to trigger
    jest.advanceTimersByTime(500);
    expect(showErrorSpy).toHaveBeenCalledWith('Error-Alert', 5_000);

    // Advance timers to trigger the second setTimeout
    jest.advanceTimersByTime(500);
    expect(showInfoSpy).toHaveBeenCalledWith('Info-Alert', 5_000);
    // Advance timers for the third setTimeout
    jest.advanceTimersByTime(500);
    expect(showWarningSpy).toHaveBeenCalledWith('Warning-Alert', 5_000);
  });
});
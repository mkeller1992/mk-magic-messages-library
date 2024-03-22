import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AlertsService } from '@mk-magic-alerts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

class MockAlertsService {
  showSuccess = jest.fn();
  showError = jest.fn();
  showInfo = jest.fn();
  showWarning = jest.fn();
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAlertsService: MockAlertsService;

  beforeEach(async () => {
    mockAlertsService = new MockAlertsService();

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AlertsService, useValue: mockAlertsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
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
    component.ngOnInit();

    // No need to advance time for the synchronous call to showSuccess, which should be checked directly
    expect(mockAlertsService.showSuccess).toHaveBeenCalledWith('Success-Alert', 5_000);

    // Advance timers just enough for the first setTimeout to trigger
    jest.advanceTimersByTime(500);
    expect(mockAlertsService.showError).toHaveBeenCalledWith('Error-Alert', 5_000);

    // Advance timers to trigger the second setTimeout
    jest.advanceTimersByTime(500);
    expect(mockAlertsService.showInfo).toHaveBeenCalledWith('Info-Alert', 5_000);
    // Advance timers for the third setTimeout
    jest.advanceTimersByTime(500);
    expect(mockAlertsService.showWarning).toHaveBeenCalledWith('Warning-Alert', 5_000);
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AlertsService } from '@mk-magic-alerts';

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
      // Provide the mock instead of the real service
      providers: [
        { provide: AlertsService, useValue: mockAlertsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AlertsService methods on ngOnInit', () => {
    // Calls to ngOnInit are automatically handled by Angular when the component is created
    // but you can call it again for the sake of testing if needed
    // component.ngOnInit();

    expect(mockAlertsService.showSuccess).toHaveBeenCalledWith('TEST', 6_000);
    expect(mockAlertsService.showError).toHaveBeenCalledWith('This is a test-message with a very long text. This is a test-message with a very long text. ');
    expect(mockAlertsService.showInfo).toHaveBeenCalledWith('INFO');
    expect(mockAlertsService.showWarning).toHaveBeenCalledWith('Warning');
  });
});
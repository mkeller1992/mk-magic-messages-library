import { ChangeDetectorRef, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AlertsStoreService } from '../../alerts-store.service';
import { AlertState } from '../models/alert-state';
import { Alert } from '../models/alert.model';
import { NewlineAndTabsPipe } from '../pipes/new-line-and-tabs.pipe';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let mockAlertsStoreService: Partial<AlertsStoreService>;
  let mockElementRef: Partial<ElementRef>;

  beforeEach(async () => {

    mockAlertsStoreService = {
        dismissAll$: of(undefined)
    };

    mockElementRef = {
        nativeElement: {
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        },
    };

    await TestBed.configureTestingModule({
      declarations: [AlertComponent, NewlineAndTabsPipe],
      imports: [NoopAnimationsModule],
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        { provide: AlertsStoreService, useValue: mockAlertsStoreService },
        ChangeDetectorRef,
      ],
      schemas: [NO_ERRORS_SCHEMA] // Use this to ignore any unknown elements and attributes
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;

    component.alertParams = new Alert('Test Alert', 'info', 2000);
    component.dismissTimeInMillis = 2000;
  });

  it('should create', () => {
    // Act
    fixture.detectChanges();    
    // Assert
    expect(component).toBeTruthy();
  });

  it('should set alert status to AlertState.DISMISS when dismissTime is over', fakeAsync(() => {
    // Arrange
    const dismissTimeInMillis = 3000;
    component.alertParams = new Alert('Test Alert', 'info', dismissTimeInMillis);
    component.dismissTimeInMillis = dismissTimeInMillis;
    const setDismissalStartSpy = jest.spyOn(component, 'setDismissalStart');

    // Act
    fixture.detectChanges();
    tick(dismissTimeInMillis);

    // Assert
    expect(setDismissalStartSpy).toHaveBeenCalledTimes(1);
    expect(component.alertParams.state).toEqual(AlertState.DISMISS);
  }));

  it('should clean up subscriptions on destroy', () => {
    // Arrange
    const unsubscribeSpy = jest.spyOn(component['destroy$'], 'unsubscribe');

    // Act
    fixture.detectChanges();
    fixture.destroy();
  
    // Assert
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
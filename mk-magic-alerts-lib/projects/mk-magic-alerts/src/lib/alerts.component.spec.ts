import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AlertsStoreService } from './alerts-store.service';
import { AlertsComponent } from "./alerts.component";
import { Alert } from "./core/models/alert.model";
import { AlertComponent } from './core/alert/alert.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@Component({
	selector: 'app-alert', // has to equal the selector of the real AlertComponent
	template: '<div></div>', // Simplified template
  })
  class MockAlertComponent {

	@Input({ required: true })
	alertParams!: Alert;

	@Input()
	dismissTimeInMillis = 0;
}


describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let alertsStore: Partial<AlertsStoreService>;

  const infoAlertTxt = 'Info Alert';  
  const errorAlertTxt = 'Error Alert';

	beforeEach(() => {

		alertsStore = {
			dismissAll$: of(undefined),
			alerts$: of([new Alert(infoAlertTxt, 'info', 1000), new Alert(errorAlertTxt, 'error', 500)])
		}

		// configure the component
		TestBed.configureTestingModule({
			imports: [AlertsComponent, NoopAnimationsModule],
			providers: [
				{ provide: AlertComponent, useClass: MockAlertComponent },
				{ provide: AlertsStoreService, useValue: alertsStore },
			],
		})
		.compileComponents();

		// create a fixture for the component
		fixture = TestBed.createComponent(AlertsComponent);
		component = fixture.componentInstance;

		// trigger change detection
		fixture.detectChanges();
	});


	it('should create the component', () => {
		// assert that the component was created
		expect(component).toBeTruthy();
	});

	it('should inject AlertsStoreService', () => {
		expect(alertsStore).toBeTruthy();
	});

	it('should define alerts$', () => {
		expect(component.alerts$).toBeDefined();
	});

  
	/*
	it('should bind the messages$ observable to the template', () => {

		// get the alerts element from the template
		const alertDebugElements = fixture.debugElement.queryAll(By.directive(MockAlertComponent));
		const alertComponentInstances: MockAlertComponent[] = alertDebugElements.map(x => x.componentInstance);

		// assert that the alerts were rendered correctly
		expect(alertComponentInstances.length).toEqual(2);

		// Check properties of first alert
		expect(alertComponentInstances[0].alertParams.text).toContain(infoAlertTxt);
		expect(alertComponentInstances[0].dismissTimeInMillis).toEqual(1000);

		// Check text of second alert:
		expect(alertComponentInstances[1].alertParams.text).toContain(errorAlertTxt);
		expect(alertComponentInstances[1].dismissTimeInMillis).toEqual(500);	
	});
	*/

})

/* Helper Methods */

export function findComponent<T>(fixture: ComponentFixture<T>, selector: string): DebugElement {
	return fixture.debugElement.query(By.css(selector));
}

export function findAllComponents<T>(fixture: ComponentFixture<T>, selector: string): DebugElement[] {
	return fixture.debugElement.queryAll(By.css(selector));
}

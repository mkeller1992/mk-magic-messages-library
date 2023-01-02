import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { of } from "rxjs";
import { AlertsStoreService } from './alerts-store.service';
import { AlertsComponent } from "./alerts.component";
import { Alert } from "./core/models/alert.model";

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let alertsStore: AlertsStoreService;
  const infoAlertTxt = 'Info Alert';
  const errorAlertTxt = 'Error Alert';

	beforeEach(() => {
		// create a stub for the Alerts-Service
		alertsStore = jasmine.createSpyObj('', [], 
						{ alerts$: of([new Alert(infoAlertTxt, 'info', 1000), new Alert(errorAlertTxt, 'error', 500)]),
						  /* dismissAll$: of(false)*/ });

		// configure the component
		TestBed.configureTestingModule({
			declarations: [AlertsComponent],
			providers: [
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

  
	it('should bind the messages$ observable to the template', () => {

		// get the alerts element from the template
		const alerts = findAllComponents(fixture, 'app-alert');

		// assert that the alerts were rendered correctly
		expect(alerts.length).toEqual(2);

		// Check properties of first alert
		expect(alerts[0].properties['alertParams'].text).toContain(infoAlertTxt);
		expect(typeof alerts[0].properties['dismissTimeInMillis']).toEqual('number');

		// Check text of second alert:
		expect(alerts[1].properties['alertParams'].text).toContain(errorAlertTxt);		
	});

})

/* Helper Methods */

export function findComponent<T>(fixture: ComponentFixture<T>, selector: string): DebugElement {
	return fixture.debugElement.query(By.css(selector));
}

export function findAllComponents<T>(fixture: ComponentFixture<T>, selector: string): DebugElement[] {
	return fixture.debugElement.queryAll(By.css(selector));
}

import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { of } from "rxjs";
import { Alert } from "./core/models/alert.model";
import { AlertsComponent } from "./alerts.component";
import { AlertsService } from "./alerts.service";

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let msgService: AlertsService;
  const infoMsgTxt = 'Info Message';
  const errorMsgTxt = 'Error Message';

	beforeEach(() => {
		// create a stub for the MessagesService
		msgService = jasmine.createSpyObj('', ['showInfo'], 
						{ messages$: of([new Alert(infoMsgTxt, 'info', 1000),
										 new Alert(errorMsgTxt, 'error', 500)]),
						  dismissAll$: of(false) });

		// configure the component
		TestBed.configureTestingModule({
			declarations: [AlertsComponent],
			providers: [
				{ provide: AlertsService, useValue: msgService },
			],
		}).compileComponents();

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
		expect(alerts[0].properties['message'].text).toContain(infoMsgTxt);
		expect(typeof alerts[0].properties['dismissTimeInMillis']).toEqual('number');

		// Check text of second alert:
		expect(alerts[1].properties['message'].text).toContain(errorMsgTxt);		
	});

})

/* Helper Methods */

export function findComponent<T>(fixture: ComponentFixture<T>, selector: string): DebugElement {
	return fixture.debugElement.query(By.css(selector));
}

export function findAllComponents<T>(fixture: ComponentFixture<T>, selector: string): DebugElement[] {
	return fixture.debugElement.queryAll(By.css(selector));
}

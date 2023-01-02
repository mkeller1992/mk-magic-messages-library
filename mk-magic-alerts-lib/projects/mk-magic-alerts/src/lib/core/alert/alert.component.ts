import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, race, Subscription, timer } from 'rxjs';
import { first, repeat, takeUntil, tap } from 'rxjs/operators';
import { AlertsStoreService } from '../../alerts-store.service';
import { AlertState } from '../models/alert-state';
import { Alert } from '../models/alert.model';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
	animations: [
		trigger('state', [
			state(
				'void',
				style({
					height: '0',
					width: '0',
					'padding-top': '0',
					'padding-bottom': '0',
					'margin-top': '5px',
					'margin-bottom': '0',
					opacity: '0',
				})
			),
			state(
				AlertState.DISPLAY,
				style({
					height: '*',
					'padding-top': '*',
					'padding-bottom': '*',
					'margin-top': '5px',
					'margin-bottom': '0',
				})
			),
			state(
				AlertState.DISMISS,
				style({
					height: '0',
					width: '0',
					'padding-top': '0',
					'padding-bottom': '0',
					'margin-top': '5px',
					'margin-bottom': '0',
					'border-width': '0',
					opacity: '0',
				})
			),
			state(
				AlertState.DISMISSED,
				style({
					height: '0',
					width: '0',
					'padding-top': '0',
					'padding-bottom': '0',
					'margin-top': '0',
					'margin-bottom': '0',
					'border-width': '0',
					opacity: '0',
				})
			),
			transition('* => display', animate('0.5s ease')),
			transition('display => dismiss', animate('0.5s ease')),
			transition('dismiss => dismissed', animate('0.3s ease')),
		]),
	],
})
export class AlertComponent implements OnInit, OnDestroy {
	//
	@Input()
	alertParams!: Alert;

	@Input()
	dismissTimeInMillis = 2_147_483_647;

	readonly mouseenter$ = fromEvent(this.elementRef.nativeElement, 'mouseenter');
	readonly mouseleave$ = fromEvent(this.elementRef.nativeElement, 'mouseleave');

	subs = new Subscription();

	constructor(@Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
				private alertsStore: AlertsStoreService,
				private cdRef: ChangeDetectorRef) {}

	ngOnInit(): void {
		// Observable that allows closing of the alert by user-click:
		const dismissalByUser$: Observable<any> = fromEvent(this.elementRef.nativeElement, 'mouseup');

		// If dismissal is requested programmatically from alerts-service:
		const dismissalByService$: Observable<any> = this.alertsStore.dismissAll$;

		// Observable that closes the alert after a given time,
		// unless user hovers over the alert with a cursor => 'takeUntil()' and 'repeat()'
		const dismissalAfterTimeout$: Observable<any> = timer(this.dismissTimeInMillis).pipe(
			takeUntil(this.mouseenter$),
			repeat({ delay: () => this.mouseleave$ })); // on mouseleave: Resubscribe to source (here: 'timer()')

		this.subs.add(race([dismissalByUser$, dismissalByService$, dismissalAfterTimeout$])
			.pipe(
				first(), // after first emission, unsubscribe also from the winning observable
				tap(() => this.setDismissalStart())
			)
			.subscribe());
	}

	/* Triggers the animated disappearing of the alert */
	private setDismissalStart() {
		this.alertParams.state = AlertState.DISMISS;
		this.cdRef.detectChanges();
	}

	/* Is evoked at the end of the animated disappearing of the alert */
	public onDismissalCompleted() {
		if (this.alertParams?.state === AlertState.DISMISS) {
			this.alertParams.state = AlertState.DISMISSED;
			this.cdRef.detectChanges();
		}
	}


	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
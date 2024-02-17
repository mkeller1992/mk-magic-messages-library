import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, fromEvent, race, timer } from 'rxjs';
import { first, repeat, takeUntil, tap } from 'rxjs/operators';
import { AlertsStoreService } from '../../alerts-store.service';
import { AlertState } from '../models/alert-state';
import { Alert } from '../models/alert.model';
import { alertAnimations } from './alert-animations';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
	animations: alertAnimations,
})

export class AlertComponent implements OnInit, OnDestroy {

	@Input({ required: true })
	alertParams!: Alert;

	@Input()
	dismissTimeInMillis = 2_147_483_647;

	private destroy$ = new Subject<void>();

	constructor(private readonly elementRef: ElementRef<HTMLElement>,
				private alertsStore: AlertsStoreService,
				private cdRef: ChangeDetectorRef) {}

	ngOnInit(): void {

		const mouseenter$: Observable<Event> = fromEvent(this.elementRef.nativeElement, 'mouseenter');
		const mouseleave$: Observable<Event> = fromEvent(this.elementRef.nativeElement, 'mouseleave');

		// Observable that allows closing of the alert by user-click:
		const dismissalByUser$: Observable<Event> = fromEvent(this.elementRef.nativeElement, 'mouseup');

		// If dismissal is requested programmatically from alerts-service:
		const dismissalByService$: Observable<void> = this.alertsStore.dismissAll$;

		// Observable that closes the alert after a given time,
		// unless user hovers over the alert with a cursor => 'takeUntil()' and 'repeat()'
		const dismissalAfterTimeout$: Observable<0> = timer(this.dismissTimeInMillis).pipe(
			takeUntil(mouseenter$),
			repeat({ delay: () => mouseleave$ })); // on mouseleave: Resubscribe to source (here: 'timer()')

		race([dismissalByUser$, dismissalByService$, dismissalAfterTimeout$])
			.pipe(
				first(), // after first emission, unsubscribe also from the winning observable
				tap(() => this.setDismissalStart()),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	/* Triggers the animated disappearing of the alert */
	setDismissalStart() {
		this.alertParams.state = AlertState.DISMISS;
		this.cdRef.detectChanges();
	}

	/* Is evoked at the end of the animated disappearing of the alert */
	onDismissalCompleted() {
		if (this.alertParams?.state === AlertState.DISMISS) {
			this.alertParams.state = AlertState.DISMISSED;
			this.cdRef.detectChanges();
		}
	}


	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}
}

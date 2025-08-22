import { ChangeDetectorRef, Component, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, fromEvent, race, timer } from 'rxjs';
import { repeat, take, takeUntil, tap } from 'rxjs/operators';
import { AlertsStore } from '../alerts.store';
import { AlertState } from '../models/alert-state';
import { Alert } from '../models/alert.model';
import { NewlineAndTabsPipe } from '../pipes/new-line-and-tabs.pipe';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    imports: [NewlineAndTabsPipe]
})

export class AlertComponent implements OnInit, OnDestroy {
	private readonly elementRef = inject(ElementRef<HTMLElement>);
	private readonly alertsStore = inject(AlertsStore);
	private readonly cdr = inject(ChangeDetectorRef);

	@Input({ required: true })
	alertParams!: Alert;

	@Input()
	dismissTimeInMillis = 2_147_483_647;

	private destroy$ = new Subject<void>();


	ngOnInit(): void {
		const el = this.elementRef.nativeElement;

		const mouseenter$: Observable<Event> = fromEvent(el, 'mouseenter');
		const mouseleave$: Observable<Event> = fromEvent(el, 'mouseleave');

		// Observable that allows closing of the alert by user-click:
		const dismissalByUser$: Observable<Event> = fromEvent(el, 'mouseup');

		// If dismissal is requested programmatically from alerts-service:
		const dismissalByService$: Observable<void> = this.alertsStore.dismissAll$;

		// Observable that closes the alert after a given time,
		// unless user hovers over the alert with a cursor => 'takeUntil()' and 'repeat()'
		const dismissalAfterTimeout$: Observable<0> = timer(this.dismissTimeInMillis).pipe(
			takeUntil(mouseenter$),
			repeat({ delay: () => mouseleave$ })); // on mouseleave: Resubscribe to source (here: 'timer()')

		race([dismissalByUser$, dismissalByService$, dismissalAfterTimeout$])
			.pipe(
				take(1), // after first emission, unsubscribe also from the winning observable
				tap(() => this.setDismissalStart()),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	/* Triggers the animated disappearing of the alert */
	setDismissalStart() {
		if (this.alertParams.state !== AlertState.DISMISS) {
			this.alertParams.state = AlertState.DISMISS;
			// Zoneless: this runs from RxJS/DOM listeners, so request a render
			this.cdr.detectChanges();
		}
	}

	/** After the leave transition finishes, mark as DISMISSED */
	onContainerTransitionEnd(e: TransitionEvent) {
		// Listen for a property used in your leave transition
		if (this.alertParams.state === AlertState.DISMISS &&
			(e.propertyName === 'grid-template-rows' || e.propertyName === 'opacity')) {
			this.alertParams.state = AlertState.DISMISSED;
			this.cdr.detectChanges();
		}
	}


	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}

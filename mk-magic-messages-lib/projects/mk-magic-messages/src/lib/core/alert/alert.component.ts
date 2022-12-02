import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, race, Subscription, timer } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { MessageState } from '../models/message-state.constant';
import { Message } from '../models/message.model';

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
				MessageState.DISPLAY,
				style({
					height: '*',
					'padding-top': '*',
					'padding-bottom': '*',
					'margin-top': '5px',
					'margin-bottom': '0',
				})
			),
			state(
				MessageState.DISMISS,
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
				MessageState.DISMISSED,
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
	message!: Message;

	@Input()
	dismissTimeInMillis = 2_147_483_647;

	@Input()
	dismissProgrammatically$!: Observable<boolean>;

	subs = new Subscription();

	constructor(@Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
				private cdRef: ChangeDetectorRef) {}

	ngOnInit(): void {
		// Observable that allows closing of the message by user-click:
		const dismissalByUser$: Observable<any> = fromEvent(this.elementRef.nativeElement, 'mouseup');

		// If dismissal is requested programmatically from message-service:
		const dismissalByService$: Observable<any> = this.dismissProgrammatically$;

		// Observable that closes the message after a given time:
		const dismissalAfterTimeout$: Observable<any> = timer(this.dismissTimeInMillis);

		this.subs.add(race([dismissalByUser$, dismissalByService$, dismissalAfterTimeout$])
			.pipe(
				first(), // after first emission, unsubscribe also from the winning observable
				tap(() => this.setDismissalStart())
			)
			.subscribe());
	}

	/* Triggers the animated disappearing of the message */
	private setDismissalStart() {
		this.message.state = MessageState.DISMISS;
		this.cdRef.detectChanges();
	}

	/* Is evoked at the end of the animated disappearing of the message */
	public onDismissalCompleted() {
		if (this.message?.state === MessageState.DISMISS) {
			this.message.state = MessageState.DISMISSED;
			this.cdRef.detectChanges();
		}
	}


	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}

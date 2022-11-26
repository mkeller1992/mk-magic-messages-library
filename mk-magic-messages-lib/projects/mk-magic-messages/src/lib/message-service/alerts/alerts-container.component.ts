import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagesService } from '../../messages.service';
import { Message } from '../models/message.model';

@Component({
	selector: 'app-alerts-container',
	templateUrl: './alerts-container.component.html',
	styleUrls: ['./alerts-container.component.scss'],
})
export class AlertsContainerComponent {
 //
	alerts$: Observable<Message[]>;

	dismissAll$: Observable<boolean>;

	constructor(public msgService: MessagesService) {
		this.alerts$ = this.msgService.messages$;
		this.dismissAll$ = msgService.dismissAll$;
	}
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './core/models/message.model';
import { MessagesService } from './messages.service';

@Component({
  selector: 'magic-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

	alerts$: Observable<Message[]>;

	dismissAll$: Observable<boolean>;

	constructor(public msgService: MessagesService) {
		this.alerts$ = this.msgService.messages$;
		this.dismissAll$ = msgService.dismissAll$;
	}
}

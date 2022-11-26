import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject, tap, firstValueFrom } from 'rxjs';
import { DialogComponent, DialogData } from './message-service/dialogs/dialog.component';
import { MessageState } from './message-service/models/message-state.constant';
import { MessageType } from './message-service/models/message-type.constant';
import { Message } from './message-service/models/message.model';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

	private messagesSubject = new BehaviorSubject<Message[]>([]);

	public messages$: Observable<Message[]> = this.messagesSubject.asObservable();

	private dismissAllSubject = new Subject<boolean>();

	public dismissAll$: Observable<boolean> = this.dismissAllSubject.asObservable();

	constructor(public dialog: MatDialog) {
		// nothing to do here
	}

	public showInfo(message: string, dismissTime: number = 10_000) {
		this.addMessage(message, MessageType.DEFAULT, dismissTime);
	}

	public showSuccess(message: string, dismissTime: number = 4_000) {
		this.addMessage(message, MessageType.OK, dismissTime);
	}

	public showWarning(message: string, dismissTime: number = 10_000) {
		this.addMessage(message, MessageType.WARNING, dismissTime);
	}

	public showError(message: string, dismissTime: number = 2_147_483_647) {
		this.addMessage(message, MessageType.ERROR, dismissTime);
	}

	public clear() {
		this.dismissAllSubject.next(true);
	}

	public showNotification(title: string, text: string, align = 'center', okayBtnTxt = 'OK'): Promise<boolean | null> {
		return this.showDialog(title, text, align, okayBtnTxt, null);
	}

	public showCustomNotification<T>(comp: ComponentType<T>, inputData: any, compWidth = '250px', okayBtnTxt = 'OK'): Observable<any> {
		inputData.okayBtn = okayBtnTxt;
		const dialogRef = this.dialog.open<T>(comp, {
			width: compWidth,
			data: inputData,
		});

		return dialogRef.afterClosed();
	}

	public showDialog(
		msgTitle: string,
		msgText: string,
		alignment: string = 'center',
		okayBtnTxt: string = 'OK',
		cancelBtnTxt: string | null = 'Abbrechen'
	): Promise<boolean | null> {
		const dialogRef = this.dialog.open(DialogComponent, {
			maxWidth: '600px',
			data: {
				title: msgTitle,
				text: msgText,
				align: alignment,
				okayBtn: okayBtnTxt,
				cancelBtn: cancelBtnTxt,
			} as DialogData,
		});

		const afterClosed$ = dialogRef.afterClosed().pipe(tap((val) => console.warn('showDialog() returns ', val)));
		return firstValueFrom(afterClosed$);
	}

	private addMessage(text: string, type: string, dismissTime: number) {
		// Remove already dismissed Messages
		// filter() makes a shallow copy of the array (a new array, but pointing to the same objects)
		const activeMessages = this.messagesSubject.getValue().filter((m) => m.state !== MessageState.DISMISSED);

		// Create and add new message:
		activeMessages.push(new Message(text, type, dismissTime));

		// Trigger Observable:
		this.messagesSubject.next(activeMessages);
	}
}

import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, firstValueFrom, Observable, Subject, tap } from 'rxjs';
import { DialogComponent, DialogData } from './core/dialogs/dialog.component';
import { MessageState } from './core/models/message-state.constant';
import { MessageType } from './core/models/message-type.constant';
import { Message } from './core/models/message.model';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
	//
	private messagesSubject = new BehaviorSubject<Message[]>([]);

	public messages$: Observable<Message[]> = this.messagesSubject.asObservable();

	private dismissAllSubject = new Subject<boolean>();

	public dismissAll$: Observable<boolean> = this.dismissAllSubject.asObservable();

	constructor(public dialog: MatDialog) {
		// nothing to do here
	}

	showInfo(message: string, dismissTimeInMillis: number = 10_000) {
		this.addMessage(message, MessageType.DEFAULT, dismissTimeInMillis);
	}

	showSuccess(message: string, dismissTimeInMillis: number = 4_000) {
		this.addMessage(message, MessageType.OK, dismissTimeInMillis);
	}

	showWarning(message: string, dismissTimeInMillis: number = 10_000) {
		this.addMessage(message, MessageType.WARNING, dismissTimeInMillis);
	}

	showError(message: string, dismissTimeInMillis: number = 2_147_483_647) {
		this.addMessage(message, MessageType.ERROR, dismissTimeInMillis);
	}

	clear() {
		this.dismissAllSubject.next(true);
	}

	showNotification(title: string, text: string, align = 'center', okayBtnTxt = 'OK'): Promise<boolean | null> {
		return this.showDialog(title, text, align, okayBtnTxt, null);
	}

	showCustomNotification<T, U>(comp: ComponentType<T>, inputData: any, disableOutsideClick: boolean,
								compWidth = '500px', modalPosition = {} as DialogPosition): Promise<U> {

		const dialogRef = this.dialog.open<T>(comp, {
			width: compWidth,
			data: inputData,
			position: modalPosition,
			disableClose: disableOutsideClick
		});

		return firstValueFrom<U>(dialogRef.afterClosed()
			.pipe(
				tap(val => console.log('showCustomNotification() returns ', val))
			));
	}

	showDialog(msgTitle: string, msgText: string, alignment: string = 'center',
		okayBtnTxt: string = 'OK', cancelBtnTxt: string | null = 'Abbrechen'): Promise<boolean | null> {

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

		return firstValueFrom(dialogRef.afterClosed()
			.pipe(
				tap((val) => console.warn('showDialog() returns ', val))
			));
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

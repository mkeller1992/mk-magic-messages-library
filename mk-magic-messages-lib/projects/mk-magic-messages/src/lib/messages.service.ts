import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, firstValueFrom, Observable, Subject, tap } from 'rxjs';
import { DialogComponent, DialogData } from './core/dialogs/dialog.component';
import { MessageState } from './core/models/message-state.constant';
import { MessageType } from './core/models/message-type.constant';
import { Message } from './core/models/message.model';

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

	public showNotification(title: string, text: string, align = 'center', okayBtnTxt = 'OK', disableOutsideClick = true): Promise<boolean | null> {
		return this.showDialog(title, text, align, okayBtnTxt, null, disableOutsideClick);
	}

	showCustomNotification<T>(comp: ComponentType<T>, inputData: any, disableOutsideClick: boolean, compWidth = '250px', okayBtnTxt = 'OK'): Promise<any> {
		inputData.okayBtn = okayBtnTxt;
		const dialogRef = this.dialog.open<T>(comp, {
			width: compWidth,
			data: inputData,
			disableClose: disableOutsideClick
		});

		return firstValueFrom(dialogRef.afterClosed()
			.pipe(
				tap(val => console.log('showCustomNotification() returns:', val))
			));
	}

	showDialog(
		msgTitle: string,
		msgText: string,
		alignment: string = 'left',
		okayBtnTxt: string = 'OK',
		cancelBtnTxt: string | null = 'Abbrechen',
		disableOutsideClick = true): Promise<boolean | null> {
		const dialogRef = this.dialog.open(DialogComponent, {
			maxWidth: '550px',
			disableClose: disableOutsideClick,
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
				tap(val => console.log('showDialog() returns:', val))
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

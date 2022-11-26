import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	title: string;
	text: string;
	align: string;
	okayBtn: string;
	cancelBtn: string;
}

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnDestroy {
 //
	okayBtnTxt: string;
	cancelBtnTxt: string;
	alignment: string;

	private confirmationStatus: boolean | null = null;

	constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
		this.okayBtnTxt = data.okayBtn;
		this.cancelBtnTxt = data.cancelBtn;
		this.alignment = data.align;
	}

	get alignmentTag(): string {
		return `text-align:${this.alignment};`;
	}

	onClick(selectedStatus: boolean) {
		this.confirmationStatus = selectedStatus;
		this.dialogRef.close(selectedStatus);
	}

	/* If no option was selected, unsubscribe to prevent memory leak */
	ngOnDestroy(): void {
		if (this.confirmationStatus == null) {
			console.log('UNSUBSCRIBE from Dialog-Component');
			this.dialogRef.close(null);
		}
	}
}

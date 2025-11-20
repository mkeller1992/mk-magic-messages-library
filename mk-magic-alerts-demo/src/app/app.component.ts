import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from '@mk-magic-alerts';
import packageJson from '../../package.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [ReactiveFormsModule]
})
export class AppComponent implements OnInit {
	private readonly msgSvc = inject(AlertsService);

	title = 'mk-magic-alerts-demo';
	alertsForm!: FormGroup;

	ngOnInit(): void {
		console.log(`Frontend Version: v${packageJson?.version}`);

		this.alertsForm = new FormGroup({
			successAlert: new FormControl('Success!', Validators.required),
			successDuration: new FormControl(3, [Validators.required, Validators.min(1)]),
			errorAlert: new FormControl('Error!', Validators.required),
			errorDuration: new FormControl(3, [Validators.required, Validators.min(1)]),
			infoAlert: new FormControl('Info!', Validators.required),
			infoDuration: new FormControl(3, [Validators.required, Validators.min(1)]),
			warningAlert: new FormControl('Warning!', Validators.required),
			warningDuration: new FormControl(3, [Validators.required, Validators.min(1)])
		});

		this.displaySuccess('Success-Alert', 5);
		setTimeout(() => this.displayError('Error-Alert', 5), 500);
		setTimeout(() => this.displayInfo('Info-Alert', 5), 1000);
		setTimeout(() => this.displayWarning('Warning-Alert', 5), 1500);
	}

	submitSuccess() {
		const { successAlert, successDuration } = this.alertsForm.value;
		this.displaySuccess(successAlert, successDuration);
	}

	submitError() {
		const { errorAlert, errorDuration } = this.alertsForm.value;
		this.displayError(errorAlert, errorDuration);
	}

	submitInfo() {
		const { infoAlert, infoDuration } = this.alertsForm.value;
		this.displayInfo(infoAlert, infoDuration);
	}

	submitWarning() {
		const { warningAlert, warningDuration } = this.alertsForm.value;
		this.displayWarning(warningAlert, warningDuration);
	}

	private displaySuccess(msg: string, durationInSec: number) {
		const durationInMillis = (durationInSec ?? 1) * 1000;
		this.msgSvc.showSuccess(msg, durationInMillis);
	}

	private displayError(msg: string, durationInSec: number) {
		const durationInMillis = (durationInSec ?? 1) * 1000;
		this.msgSvc.showError(msg, durationInMillis);
	}

	private displayInfo(msg: string, durationInSec: number) {
		const durationInMillis = (durationInSec ?? 1) * 1000;
		this.msgSvc.showInfo(msg, durationInMillis);
	}

	private displayWarning(msg: string, durationInSec: number) {
		const durationInMillis = (durationInSec ?? 1) * 1000;
		this.msgSvc.showWarning(msg, durationInMillis);
	}

}

import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertEntryAnimation, AlertsService } from '@mk-magic-alerts';
import packageJson from '../../package.json';

interface EntryAnimationOption {
	value: AlertEntryAnimation;
	label: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule]
})
export class AppComponent implements OnInit {
	private readonly msgSvc = inject(AlertsService);

	title = 'mk-magic-alerts-demo';
	alertsForm!: FormGroup;
	readonly entryAnimationOptions: EntryAnimationOption[] = [
		{ value: AlertEntryAnimation.DOT, label: 'Dot' },
		{ value: AlertEntryAnimation.BURST, label: 'Burst' },
		{ value: AlertEntryAnimation.DROP, label: 'Drop' },
		{ value: AlertEntryAnimation.SLIDE_RIGHT, label: 'Slide right' },
		{ value: AlertEntryAnimation.UNFOLD, label: 'Unfold' }
	];

	ngOnInit(): void {
		console.log(`Frontend Version: v${packageJson?.version}`);

		this.alertsForm = new FormGroup({
			entryAnimation: new FormControl(AlertEntryAnimation.BURST, Validators.required),
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
		setTimeout(() => this.displayError('Error-Alert', 5), 1_000);
		setTimeout(() => this.displayInfo('Info-Alert', 5), 2_000);
		setTimeout(() => this.displayWarning('Warning-Alert', 5), 3_000);
	}

	submitSelectedAnimation() {
		const selectedAnimation = this.getSelectedEntryAnimation();
		this.msgSvc.setEntryAnimation(selectedAnimation);
		this.msgSvc.showInfo(`Entry animation: ${this.getAnimationLabel(selectedAnimation)}`, 4_000);
	}

	submitAllEntryAnimations() {
		this.entryAnimationOptions.forEach((option, index) => {
			setTimeout(() => {
				this.msgSvc.setEntryAnimation(option.value);
				this.msgSvc.showInfo(`Entry animation: ${option.label}`, 7_000);
			}, index * 1_500);
		});
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
		this.msgSvc.setEntryAnimation(this.getSelectedEntryAnimation());
		const durationInMillis = (durationInSec ?? 1) * 1000;
		this.msgSvc.showSuccess(msg, durationInMillis);
	}

	private displayError(msg: string, durationInSec: number) {
		this.msgSvc.setEntryAnimation(this.getSelectedEntryAnimation());
		const durationInMillis = (durationInSec ?? 1) * 1000;
		this.msgSvc.showError(msg, durationInMillis);
	}

	private displayInfo(msg: string, durationInSec: number) {
		this.msgSvc.setEntryAnimation(this.getSelectedEntryAnimation());
		const durationInMillis = (durationInSec ?? 1) * 1000;
		this.msgSvc.showInfo(msg, durationInMillis);
	}

	private displayWarning(msg: string, durationInSec: number) {
		this.msgSvc.setEntryAnimation(this.getSelectedEntryAnimation());
		const durationInMillis = (durationInSec ?? 1) * 1000;
		this.msgSvc.showWarning(msg, durationInMillis);
	}

	private getSelectedEntryAnimation(): AlertEntryAnimation {
		return this.alertsForm.value.entryAnimation ?? AlertEntryAnimation.BURST;
	}

	private getAnimationLabel(entryAnimation: AlertEntryAnimation): string {
		return this.entryAnimationOptions.find(option => option.value === entryAnimation)?.label ?? entryAnimation;
	}

}

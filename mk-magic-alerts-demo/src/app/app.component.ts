import { Component, OnInit } from '@angular/core';
import { AlertsService } from '@mk-magic-alerts';
import packageJson from '../../package.json';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mk-magic-alerts-demo';
  alertsForm: FormGroup;

  constructor(private msgSvc: AlertsService) {
    this.alertsForm = new FormGroup({
      successMessage: new FormControl('', Validators.required),
      successDuration: new FormControl(1, [Validators.required, Validators.min(1)]),
      errorMessage: new FormControl('', Validators.required),
      errorDuration: new FormControl(1, [Validators.required, Validators.min(1)]),
      infoMessage: new FormControl('', Validators.required),
      infoDuration: new FormControl(1, [Validators.required, Validators.min(1)]),
      warningMessage: new FormControl('', Validators.required),
      warningDuration: new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }
	ngOnInit(): void {
    
    console.log(`Frontend Version: v${packageJson?.version}`);

		this.displaySuccess('Success', 5);
		this.displayError('Error', 6);
		this.displayInfo('Info', 7);
		this.displayWarning('Warning', 8);
	}

  submitSuccess() {
    const { successMessage, successDuration } = this.alertsForm.value;
    this.displaySuccess(successMessage, successDuration);
  }

  submitError() {
    const { errorMessage, errorDuration } = this.alertsForm.value;
    this.displayError(errorMessage, errorDuration);
  }

  submitInfo() {
    const { infoMessage, infoDuration } = this.alertsForm.value;
    this.displayInfo(infoMessage, infoDuration);
  }

  submitWarning() {
    const { warningMessage, warningDuration } = this.alertsForm.value;
    this.displayWarning(warningMessage, warningDuration);
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

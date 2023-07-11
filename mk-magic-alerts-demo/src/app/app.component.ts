import { Component, OnInit } from '@angular/core';
import { AlertsService } from '@mk-magic-alerts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mk-magic-alerts-demo';

  constructor(private msgSvc: AlertsService) {

  }
	ngOnInit(): void {
		this.msgSvc.showSuccess('TEST', 6_000);
		this.msgSvc.showError('This is a test-message with a very long text. This is a test-message with a very long text. ');
		this.msgSvc.showInfo('INFO');
		this.msgSvc.showWarning('Warning');
	}

}

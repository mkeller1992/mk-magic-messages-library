import { Component, OnInit } from '@angular/core';
import { MessagesService } from '@mk-magic-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mk-magic-messages-demo';

  constructor(private msgSvc: MessagesService) {

  }
	ngOnInit(): void {
		this.msgSvc.showInfo('TEST', 100_000);
		this.msgSvc.showError('This is a test-message');
		this.msgSvc.showInfo('INFO');
		this.msgSvc.showWarning('Warning');

		this.msgSvc.showDialog('This is the title', 'And this is the displayed message and it is a very long message. Just for testing purposes!');

	}

}

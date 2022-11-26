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
		this.msgSvc.showError('TEST');
		this.msgSvc.showInfo('TEST');
	}

}

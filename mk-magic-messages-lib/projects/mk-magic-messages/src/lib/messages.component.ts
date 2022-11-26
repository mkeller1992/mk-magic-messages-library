import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-mk-magic-messages',
  template: `
  	<script defer src="./assets/fontawesome-all.js"></script>
    <!-- Message Container -->
	<app-alerts-container></app-alerts-container>
  `,
  styles: [
  ]
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { AlertState } from './alert-state';

export class Alert {
 //
	public text: string;
	public type: string;
	public state: string;
	public dismissTimeInMillis: number;

	constructor(text: string, type: string, dismissTime: number) {
		this.text = text;
		this.type = type;
		this.dismissTimeInMillis = dismissTime;
		this.state = AlertState.DISPLAY;
	}
}

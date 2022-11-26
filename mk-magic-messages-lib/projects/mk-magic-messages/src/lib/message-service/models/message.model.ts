import { MessageState } from './message-state.constant';

export class Message {
 //
	public text: string;
	public type: string;
	public state: string;
	public dismissTimeInMillis: number;

	constructor(text: string, type: string, dismissTime: number) {
		this.text = text;
		this.type = type;
		this.dismissTimeInMillis = dismissTime;
		this.state = MessageState.DISPLAY;
	}
}

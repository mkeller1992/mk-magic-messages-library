import { AlertState } from './alert-state';
import { AlertType } from './alert-type';

export interface Alert {
	id: string;
	text: string;
	type: AlertType;
	state: AlertState;
	dismissTimeInMillis: number;
}

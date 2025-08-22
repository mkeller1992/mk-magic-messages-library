import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
	name: 'newlineAndTabs',
	standalone: true
 })

export class NewlineAndTabsPipe implements PipeTransform {
	
	transform(value: any): any {
		return value?.toString().replace(/(?:\r\n|\r|\n)/g, '<br />').replace(/(?:\t)/g, '&nbsp;&nbsp;&nbsp;&nbsp;') ?? '';
	}
}

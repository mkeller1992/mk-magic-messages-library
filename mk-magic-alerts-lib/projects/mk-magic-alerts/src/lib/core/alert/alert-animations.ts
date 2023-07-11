import { trigger, state, style, transition, animate, query, group, sequence } from '@angular/animations';
import { AlertState } from '../models/alert-state';

export const alertAnimations = [
    trigger('state', [
        state(
            'void',
            style({
                height: '0',
                width: '0',
                'padding-top': '0',
                'padding-bottom': '0',
                'margin-top': '5px',
                'margin-bottom': '0',
                opacity: '0',
            })
        ),
        state(
            AlertState.DISPLAY,
            style({
                height: '*',
                'padding-top': '*',
                'padding-bottom': '*',
                'margin-top': '5px',
                'margin-bottom': '0',
            })
        ),
        state(
            AlertState.DISMISS,
            style({
                height: '0',
                width: '0',
                'padding-top': '0',
                'padding-bottom': '0',
                'margin-top': '5px',
                'margin-bottom': '0',
                'border-width': '0',
                opacity: '0',
            })
        ),
        state(
            AlertState.DISMISSED,
            style({
                height: '0',
                width: '0',
                'padding-top': '0',
                'padding-bottom': '0',
                'margin-top': '0',
                'margin-bottom': '0',
                'border-width': '0',
                opacity: '0',
            })
        ),
        transition('* => display',
            // sequence = sequential actions:
            sequence([
                query('.alert-text', [ style({ opacity: 0 }) ]),
                animate('0.3s ease'),
                query('.alert-text', [ animate('0.1s', style({ opacity: 1 })) ])
              ]
        )),
        transition('display => dismiss', 
            // group = parallel actions:
            group([
                query('.alert-text', [ animate('0.05s', style({ opacity: 0 })) ]),
                animate('0.5s ease')
            ]
        )),
        transition('dismiss => dismissed',
            // group = parallel actions:
            group([
                query('.alert-text', [ animate('0.05s', style({ opacity: 0 })) ]),
                animate('0.3s ease')
            ]
        ))
    ])
];
import { alertAnimations } from './alert-animations';
import { AlertState } from '../models/alert-state';
import { AnimationTriggerMetadata } from '@angular/animations';

describe('alertAnimations', () => {
  let stateTrigger: AnimationTriggerMetadata | undefined;

  beforeEach(() => {
    stateTrigger = alertAnimations.find(trigger => trigger.name === 'state');
  });

  it('should have alertAnimations defined', () => {
    expect(alertAnimations.length).toBeGreaterThan(0);
    expect(stateTrigger).toBeDefined();
  });

  it('should define required states', () => {
    const states = stateTrigger!.definitions.filter(def => def.type === 0); // Assuming type 0 is for state definitions
    const stateNames = states.map(state => (state as any).name);
    expect(stateNames).toContain('void');
    expect(stateNames).toContain(AlertState.DISPLAY);
    expect(stateNames).toContain(AlertState.DISMISS);
    expect(stateNames).toContain(AlertState.DISMISSED);
  });


  it('should define required transitions', () => {
    const transitions = stateTrigger!.definitions.filter(def => def.type === 1); // Assuming type 1 is for transition definitions
    const transitionExpressions = transitions.map(transition => (transition as any).expr);

    expect(transitionExpressions).toContainEqual(expect.stringMatching(/^\* => display$/));
    expect(transitionExpressions).toContainEqual(expect.stringMatching(/^display => dismiss$/));
    expect(transitionExpressions).toContainEqual(expect.stringMatching(/^dismiss => dismissed$/));
  });

});
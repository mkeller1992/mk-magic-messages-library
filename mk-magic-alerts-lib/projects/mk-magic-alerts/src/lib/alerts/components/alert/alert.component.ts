import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnInit, computed, inject, input, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, fromEvent, race, timer } from 'rxjs';
import { repeat, take, takeUntil, tap } from 'rxjs/operators';
import { AlertState } from '../../models/alert-state';
import { Alert } from '../../models/alert.model';
import { NewlineAndTabsPipe } from '../../pipes/new-line-and-tabs.pipe';
import { AlertsStore } from '../../state/alerts.store';
import { AlertEntryAnimation } from '../../models/alert-entry-animation';
import { AlertAppearance } from '../../models/alert-appearance';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NewlineAndTabsPipe]
})
export class AlertComponent implements OnInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly alertsStore = inject(AlertsStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly alertParams = input.required<Alert>();
  readonly entryAnimation = input.required<AlertEntryAnimation>();
  readonly alertAppearance = input.required<AlertAppearance>();

  readonly container = viewChild<ElementRef<HTMLElement>>('container');

  readonly state = signal<AlertState>(AlertState.DISPLAY);
  readonly fixedEntryAnimation = signal<AlertEntryAnimation>(AlertEntryAnimation.DOT);

  readonly isRendered = computed(() => this.state() !== AlertState.DISMISSED);
  readonly dismissTimeInMillis = computed(() => this.alertParams().dismissTimeInMillis);

  readonly enterAnimationClass = computed(() => `alert-enter-${this.fixedEntryAnimation()}`);
  readonly leaveAnimationClass = computed(() => `alert-leave-${this.fixedEntryAnimation()}`);
  readonly animationClass = computed(() =>
    this.state() === AlertState.DISMISS
      ? this.leaveAnimationClass()
      : this.enterAnimationClass()
  );

  ngOnInit(): void {
    this.fixedEntryAnimation.set(this.entryAnimation());

    const el = this.elementRef.nativeElement;

    const mouseenter$: Observable<Event> = fromEvent(el, 'mouseenter');
    const mouseleave$: Observable<Event> = fromEvent(el, 'mouseleave');

    // Observable that allows closing of the alert by user-click:
    const dismissalByUser$: Observable<Event> = fromEvent(el, 'mouseup');

    // If dismissal is requested programmatically from alerts-service:
    const dismissalByService$: Observable<void> = this.alertsStore.dismissAll$;

    // Observable that closes the alert after a given time,
    // unless user hovers over the alert with a cursor => 'takeUntil()' and 'repeat()'
    const dismissalAfterTimeout$: Observable<0> = timer(this.dismissTimeInMillis()).pipe(
      takeUntil(mouseenter$),
      repeat({ delay: () => mouseleave$ })
    );

    race([dismissalByUser$, dismissalByService$, dismissalAfterTimeout$])
      .pipe(
        take(1),
        tap(() => this.setDismissalStart()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  /* Triggers the animated disappearing of the alert */
  setDismissalStart(): void {
    if (this.state() !== AlertState.DISMISS) {
      const el = this.container()?.nativeElement;

      if (el) {
        // Lock current height via CSS var used by the stylesheet
        el.style.setProperty('--h', `${el.offsetHeight}px`);
      }

      this.state.set(AlertState.DISMISS);
    }
  }

  /** After the leave animation finishes, mark as DISMISSED */
  onContainerAnimationEnd(event: AnimationEvent): void {
    if (
      this.state() === AlertState.DISMISS &&
      event.target === this.container()?.nativeElement
    ) {
      this.state.set(AlertState.DISMISSED);
    }
  }
}

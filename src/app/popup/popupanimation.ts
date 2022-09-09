import {
  animate,
  AnimationTriggerMetadata,
  keyframes,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const PopupAnimation: AnimationTriggerMetadata = trigger('state', [
  state('opened', style({
    transform: 'translateY(15%)',
    height: 'auto',
  })),
  state('closed', style({
    transform: 'translateY(-50%)',
    height: '0px',
    overflow: 'hidden'
  })),
  transition('closed <=> opened', [
    animate('500ms ease-out'),
  ]),
])

export const PopupBackAnimation: AnimationTriggerMetadata = trigger('backState', [
  transition(':enter', [
    animate('500ms', keyframes([
      style({
        opacity: '0.3'
      }),
      style({
        opacity: '0.6'
      }),
      style({
        opacity: '1'
      }),
    ]))
  ]),
  transition(':leave', [
    animate('600ms', keyframes([
      style({
        opacity: '1'
      }),
      style({
        opacity: '0.6'
      }),
      style({
        opacity: '0.3'
      }),
    ]))
  ])
])

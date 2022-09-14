import {
  animate,
  AnimationTriggerMetadata, group,
  keyframes, query,
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
  state('opened', style({
    opacity: '1',
    background: '#F0F8FF87',
  })),
  state('void', style({
    opacity: '0',
  })),
  transition('void <=> opened', animate(1000))
])

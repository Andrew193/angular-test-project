import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from "@angular/animations";

export const createNeItemAnimation: AnimationTriggerMetadata = trigger('createNewItem', [
  state('pulls', style({
    boxShadow: 'var(--bs-btn-focus-box-shadow)'
  })),
  state('closed', style({
    boxShadow: 'none'
  })),

  transition('* => *', [
    animate(500)
  ])
])

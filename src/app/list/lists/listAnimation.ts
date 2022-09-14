import {animate, AnimationTriggerMetadata, query, stagger, style, transition, trigger} from "@angular/animations";

export const ListAnimation: AnimationTriggerMetadata = trigger('listAnimation', [
  transition('* => *', [
    query(":enter", [
      style({opacity: 0}),
      stagger(100, animate('0.2s', style({opacity: 1})))
    ], {optional: true}),
    query(":leave", style({display:'none'}), {optional: true})
  ])
])

// import the required animation functions from the angular animations module
import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from '@angular/animations';

export const slider =
  trigger('routeAnimations', [
    transition('home => order', slideTo('right')),
    transition('home => article', slideTo('right')),
    transition('home => customer', slideTo('right')),
    transition('home => neworder', slideTo('right')),
    transition('order => home', slideTo('left')),
    transition('order => neworder', slideTo('left')),
    transition('order => articles', slideTo('right')),
    transition('order => customer', slideTo('right')),
    transition('article => home', slideTo('left')),
    transition('article => neworder', slideTo('left')),
    transition('article => order', slideTo('left')),
    transition('article => customer', slideTo('right')),
    transition('customer => home', slideTo('left')),
    transition('customer => neworder', slideTo('left')),
    transition('customer => order', slideTo('left')),
    transition('customer => article', slideTo('left')),
    transition('neworder => home', slideTo('left')),
    transition('neworder => order', slideTo('right')),
    transition('neworder => articles', slideTo('right')),
    transition('neworder => customer', slideTo('right')),
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
        'box-shadow': '0px 0px 8px 1px rgba(0, 0, 0, 0.4)',
        height: '100%',
        background: '#ffffff'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}

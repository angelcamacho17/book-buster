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
    transition('order => home', slideToLeft('left')),
    transition('order => neworder', slideToLeft('left')),
    transition('order => article', slideTo('right')),
    transition('order => customer', slideTo('right')),
    transition('article => home', slideToLeft('left')),
    transition('article => neworder', slideToLeft('left')),
    transition('article => order', slideToLeft('left')),
    transition('article => customer', slideTo('right')),
    transition('customer => home', slideToLeft('left')),
    transition('customer => neworder', slideToLeft('left')),
    transition('customer => order', slideToLeft('left')),
    transition('customer => article', slideToLeft('left')),
    transition('neworder => home', slideToLeft('left')),
    transition('neworder => order', slideTo('right')),
    transition('neworder => article', slideTo('right')),
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
        background: '#ffffff',
        'z-index': 9999
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
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}


function slideToLeft(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: '0',
        [direction]: 0,
        width: '100%',
        'box-shadow': '0px 0px 8px 1px rgba(0, 0, 0, 0.4)',
        height: '100%',
        background: '#ffffff',
        'z-index': '0'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '0%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease',
        style({
          [direction]: '100%',
          'z-index': 10000
      }))
      ], optional),
      query(':enter', [
        animate('100ms ease', style({
          [direction]: '0%',
          'z-index': 0
        }))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}

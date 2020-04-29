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
    transition('home => order', slideToRight()),
    transition('home => article', slideToRight()),
    transition('home => customer', slideToRight()),
    transition('home => neworder', slideToRight()),
    transition('order => home', slideToLeft()),
    transition('order => neworder', slideToLeft()),
    transition('order => article', slideToRight()),
    transition('order => customer', slideToRight()),
    transition('article => home', slideToLeft()),
    transition('article => neworder', slideToLeft()),
    transition('article => order', slideToLeft()),
    transition('article => customer', slideToRight()),
    transition('customer => home', slideToLeft()),
    transition('customer => neworder', slideToLeft()),
    transition('customer => order', slideToLeft()),
    transition('customer => article', slideToLeft()),
    transition('neworder => home', slideToLeft()),
    transition('neworder => order', slideToRight()),
    transition('neworder => article', slideToRight()),
    transition('neworder => customer', slideToRight()),
  ]);

function slideToRight() {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        'box-shadow': '0px 0px 8px 1px rgba(0, 0, 0, 0.4)',
        height: '100%',
        background: '#ffffff'
      })
    ], optional),
    query(':enter', [
      style({ right: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ right: '0%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ right: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}


function slideToLeft() {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: '0',
        left: 0,
        width: '100%',
        'box-shadow': '0px 0px 8px 1px rgba(0, 0, 0, 0.4)',
        height: '100%',
        background: '#ffffff',
        'z-index': '0'
      })
    ], optional),
    query(':enter', [
      style({ left: '0%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease',
        style({
          left: '100%',
          'z-index': 10000
      }))
      ], optional),
      query(':enter', [
        animate('100ms ease', style({
          left: '0%',
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

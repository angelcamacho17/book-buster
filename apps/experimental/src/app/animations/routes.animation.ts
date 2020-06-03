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
import { NONE_TYPE } from '@angular/compiler';

export const routesAnimations =
  trigger('routeAnimations', [
    transition('login => home', slideToRight()),
    transition('login => order', slideToRight()),
    transition('login => article', slideToRight()),
    transition('login => customer', slideToRight()),
    transition('login => orderitems', slideToRight()),
    transition('login => neworder', slideToRight()),

    transition('home => order', slideToRight()),
    transition('home => article', slideToRight()),
    transition('home => customer', slideToRight()),
    transition('home => orderitems', slideToRight()),
    transition('home => neworder', fromBottom()),
    transition('home => login', slideToLeft()),

    transition('order => home', slideToLeft()),
    transition('order => neworder', slideToLeft()),
    transition('order => article', slideToLeft()),
    transition('order => customer', slideToRight()),
    transition('order => orderitems', slideToRight()),


    transition('article => home', slideToLeft()),
    transition('article => neworder', slideToLeft()),
    transition('article => order', slideToRight()),
    transition('article => customer', slideToRight()),
    transition('article => orderitems', slideToRight()),
    transition('article => articledetail', slideToRight()),

    transition('articledetail => article', slideToLeft()),

    transition('customer => home', slideToLeft()),
    transition('customer => neworder', slideToLeft()),
    transition('customer => order', slideToLeft()),
    transition('customer => article', slideToLeft()),
    transition('customer => orderitems', slideToRight()),

    transition('neworder => home', fromTop()),
    transition('neworder => order', slideToRight()),
    transition('neworder => article', slideToRight()),
    transition('neworder => customer', slideToRight()),
    transition('neworder => orderitems', slideToRight()),

    transition('orderitems => home', slideToLeft()),
    transition('orderitems => order', slideToLeft()),
    transition('orderitems => article', slideToLeft()),
    transition('orderitems => customer', slideToLeft()),
    transition('orderitems => neworder', slideToLeft()),
  ]);

function slideToRight() {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'fixed',
        width: '100%',
        right: 0,
        'box-shadow': '0px 0px 8px 2px rgba(0, 0, 0, 0.6)',
        height: '100%',
        background: '#ffffff'
      })
    ], optional),
    query(':enter', [
      style({
        right: '-100%'

      })
    ]),
    group([
      query(':leave', [
        animate('300ms ease', style({
          right: '100%'
        }))
      ], optional),
      query(':enter', [
        animate('300ms ease', style({
          right: '0%'

        }))
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
    query(':leave, :enter', [
      style({
        position: 'fixed',
        left: 0,
        width: '100%',
        'box-shadow': '0px 0px 8px 2px rgba(0, 0, 0, 0.6)',
        height: '100%',
        background: '#ffffff'
      })
    ], optional),
    query(':enter', [
      style({
        left: '-100%'
      })
    ]),
    group([
      query(':leave', [
        animate('300ms ease',
        style({
          left: '100%'
      }))
      ], optional),
      query(':enter', [
        animate('300ms ease', style({
          left: '0%'
        }))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}

function fromBottom() {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'fixed',
        width: '100%',
        'box-shadow': '0px 0px 8px 2px rgba(0, 0, 0, 0.6)',
        height: '100%',
        background: '#ffffff',
        'z-index': '0'
      })
    ], optional),
    query(':enter', [
      style({
        top: '100%',
    })
    ]),
    group([
      query(':leave', [
        animate('300ms ease',
        style({
          'z-index': 0,

      }))
      ], optional),
      query(':enter', [
        animate('300ms ease', style({
          top: '0%',
          'z-index': 10000,

        }))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}

function fromTop() {
  const optional = { optional: true };
  return [
    query(':leave, :enter', [
      style({
        position: 'fixed',
        width: '100%',
        top: '0',
        'box-shadow': '0px 0px 8px 2px rgba(0, 0, 0, 0.6)',
        height: '100%',
        background: '#ffffff',
        'z-index': 1000
      })
    ], optional),
    query(':enter', [
      style({
        top: 0,
        'z-index': 0
    })
    ]),
    group([
      query(':leave', [
        animate('300ms ease',
        style({
          top: '100%',
          'z-index': 10000
      }))
      ], optional),
      query(':enter', [
        animate('300ms ease', style({
          top: 0,
          'z-index': 0,
        }))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}
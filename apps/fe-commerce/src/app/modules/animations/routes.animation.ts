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
    transition('login => main', slideToRight()),
    transition('login => home', slideToRight()),

    transition('main => login', slideToLeft()),

    transition('home => new-order', slideToRight()),
    transition('home => order', slideToRight()),
    transition('home => order-overview', slideToRight()),
    transition('home => customer-search', fromBottom()),

    transition('new-order => home', slideToLeft()),

    transition('order => home', slideToLeft()),

    transition('order-overview => home', slideToLeft()),
    transition('order-overview => order-items', slideToRight()),
    transition('order-overview => article-search', slideToRight()),
    transition('order-overview => customer-search', slideToLeft()),

    transition('order-items => order-overview', slideToLeft()),

    transition('customer-search => home', fromTop()),
    transition('customer-search => article-search', slideToRight()),
    transition('customer-search => order-overview', slideToRight()),

    transition('article-search => customer-search', slideToLeft()),

    transition('article-search => article-detail', slideToRight()),
    transition('article-search => order-overview', slideToRight()),
    transition('article-detail => article-search', slideToLeft()),


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
        background: '#F7F8F9',
        'z-index': 10,

      })
    ], optional),
    query(':enter', [
      style({
        right: '-100%'

      })
    ]),
    group([
      query(':leave', [
        animate('150ms ease', style({
          right: '100%'
        }))
      ], optional),
      query(':enter', [
        animate('150ms ease', style({
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
        background: '#F7F8F9',
        'z-index': 10
      })
    ], optional),
    query(':enter', [
      style({
        left: '-100%'
      })
    ]),
    group([
      query(':leave', [
        animate('150ms ease',
        style({
          left: '100%'
      }))
      ], optional),
      query(':enter', [
        animate('150ms ease', style({
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
        height: '100vh',
        background: '#F7F8F9',
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
        animate('150ms ease',
        style({
          'z-index': 0,

      }))
      ], optional),
      query(':enter', [
        animate('150ms ease', style({
          top: '112px',
          'z-index': 10,

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
        top: '112px',
        'box-shadow': '0px 0px 8px 2px rgba(0, 0, 0, 0.6)',
        height: '100vh',
        background: '#F7F8F9',
        'z-index': 10
      })
    ], optional),
    query(':enter', [
      style({
        top: '112px',
        'z-index': 0
    })
    ]),
    group([
      query(':leave', [
        animate('150ms ease',
        style({
          top: '100%',
          'z-index': 10
      }))
      ], optional),
      query(':enter', [
        animate('150ms ease', style({
          top: '112px',
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

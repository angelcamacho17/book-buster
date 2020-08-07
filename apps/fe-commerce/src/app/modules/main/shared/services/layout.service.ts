import { Injectable } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainModule } from '../../main.module';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public onLayoutChange$ = new BehaviorSubject<string>('(min-width:1920px)');
  public layout: string;

  private _mobile = 'mobile';
  private _tablet = 'tablet';
  private _desktop = 'desktop';

  private _breakpoints = ['(max-width:599px)',
    '(min-width:600px) and (max-width:719px)',
    '(min-width:720px) and (max-width:1149px)',
    '(min-width:1150px) and (max-width:1439px)',
    '(min-width:1440px) and (max-width:1599px)',
    '(min-width:1600px)'];
  constructor(private breakpointObserver: BreakpointObserver) {
    this.initBreakpoints();
  }

  initBreakpoints() {
    this.breakpointObserver.observe(this._breakpoints).subscribe((state: BreakpointState) => {
      if (state.matches) {
        if (state.breakpoints['(max-width:599px)']) {
          console.log('xs')
          this.layout = this._mobile;
          this.onLayoutChange$.next('xs');
        }
        if (state.breakpoints['(min-width:600px) and (max-width:719px)']) {
          console.log('sm')
          this.layout = this._tablet;
          this.onLayoutChange$.next('sm');
        }
        if (state.breakpoints['(min-width:720px) and (max-width:1149px)']) {
          console.log('md')
          this.layout = this._tablet;
          this.onLayoutChange$.next('md');
        }
        if (state.breakpoints['(min-width:1150px) and (max-width:1439px)']) {
          console.log('lg')
          this.layout = this._tablet;

          //this.layout = this._desktop;
          this.onLayoutChange$.next('lg');
        }
        if (state.breakpoints['(min-width:1440px) and (max-width:1599px)']) {
          console.log('xl')
          this.layout = this._tablet;

         //this.layout = this._desktop;
          this.onLayoutChange$.next('xl');
        }
        if (state.breakpoints['(min-width:1600px)']) {
          console.log('xxl')
          this.layout = this._tablet;

          //this.layout = this._desktop;
          this.onLayoutChange$.next('xxl');
        }
      }
    });
  }

  getOnLayoutChange(): Observable<string> {
    return this.onLayoutChange$;
  }

}

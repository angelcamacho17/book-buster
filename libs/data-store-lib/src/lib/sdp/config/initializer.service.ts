import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { zip } from 'rxjs/internal/operators/zip';

export const SDP_INITIALIZER = new InjectionToken<Array<() => void>>('SDP Initializer');
export const SDP_PRIORITY_INITIALIZER = new InjectionToken<() => void>('SDP Config Initializer');

@Injectable()
export class SDPInitializer {
  public onDone = new Subject();

  constructor(@Inject(SDP_INITIALIZER) @Optional() modules: Array<() => Observable<any>>,
              @Inject(SDP_PRIORITY_INITIALIZER) @Optional() config: Array<() => Observable<any>>) {
    if (config.length !== 0) {
      this.chainObservables(config).subscribe(() => {
        if (modules.length !== 0) {
          this.chainObservables(modules).subscribe(() => {
            this.completeInitializer();
          });
        } else {
          this.completeInitializer();
        }
      });
    } else {
      this.completeInitializer();
    }
  }

  private completeInitializer() {
    this.onDone.next();
    this.onDone.complete();
  }

  private chainObservables(val: Array<() => Observable<any>>): Observable<any> {
    let buffer = val[0]();
    for (let i = 1; i < val.length; i++) {
      buffer = buffer.pipe(zip(val[i]()));
    }
    return buffer;
  }
}

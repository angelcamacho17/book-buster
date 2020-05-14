import { SDPInitializer } from './initializer.service';
import { Subject } from 'rxjs';

function getfn1() {
  return () => {
    const sub = new Subject();
    setTimeout(() => {
      sub.next();
      sub.complete();
    }, 10);
    return sub;
  };
}

function getfn2()  {
  return () => {
    const sub = new Subject();
    setTimeout(() => {
      sub.next();
      sub.complete();
    }, 15);
    return sub;
  };
}

function getfn3()  {
  return () => {
    const sub = new Subject();
    setTimeout(() => {
      sub.next();
      sub.complete();
    }, 5);
    return sub;
  };
}

describe('Initializer unit tests', () => {
  it('No priority function and a normal function in array', (done) => {
    const initializer = new SDPInitializer([getfn1()], []);
    const spy = jasmine.createSpy('kiano');
    initializer.onDone.subscribe(spy);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(0);
      done();
    }, 100);
  });

  it('Priority function', (done) => {
    const initializer = new SDPInitializer([], [getfn1()]);
    const spy = jasmine.createSpy('kiano');
    initializer.onDone.subscribe(spy);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 100);
  });

  it('Mulitple priority function', (done) => {
    const initializer = new SDPInitializer([], [getfn1(), getfn2()]);
    const spy = jasmine.createSpy('kiano');
    initializer.onDone.subscribe(spy);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 100);
  });

  it('one priority function and 1 normal function', (done) => {
    const initializer = new SDPInitializer([getfn2()], [getfn1()]);
    const spy = jasmine.createSpy('kiano');
    initializer.onDone.subscribe(spy);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 100);
  });

  it('one priority function and multiple normal function', (done) => {
    const initializer = new SDPInitializer([getfn2(), getfn3()], [getfn1()]);
    const spy = jasmine.createSpy('kiano');
    initializer.onDone.subscribe(spy);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 100);
  });
});

import { TestBed } from '@angular/core/testing';
import { KeyValueStoreService } from './keyvaluestore.service';
import { ConfigServiceMock } from '../config/config.servicemock.spec';
import { ConfigService } from '../config/config.service';

describe('KeyvaluestoreService', () => {
    let keyvaluestoreService: KeyValueStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                KeyValueStoreService,
                {
                provide: ConfigService,
                useClass: ConfigServiceMock
                }
            ]
        });

        // tslint:disable-next-line: deprecation
        keyvaluestoreService = TestBed.get(KeyValueStoreService);
        // tslint:disable-next-line: deprecation
        const config = TestBed.get(ConfigService);
        keyvaluestoreService.initDatabase(config);
    });

    it('set and get should use dexie backend', (done) => {
        keyvaluestoreService.set('blablakey', 'blablavalue').subscribe(() => {
            keyvaluestoreService.get('blablakey').subscribe(value => {
                expect(value).toEqual('blablavalue');
                done();
            });
        });
    });

    it('update should use dexie backend', (done) => {
        keyvaluestoreService.set('blablakey', 'blablavalue').subscribe(() => {
            keyvaluestoreService.update('blablakey', 'yihaa').subscribe(() => {
                keyvaluestoreService.get('blablakey').subscribe(value => {
                    expect(value).toEqual('yihaa');
                    done();
                });
            });
        });
    });

    it('delete should use dexie backend', (done) => {
        keyvaluestoreService.set('blablakey', 'blablavalue').subscribe(() => {
            keyvaluestoreService.delete('blablakey').subscribe(() => {
                keyvaluestoreService.get('blablakey').subscribe(value => {
                    expect(value).toBeUndefined();
                    done();
                });
            });
        });
    });
});

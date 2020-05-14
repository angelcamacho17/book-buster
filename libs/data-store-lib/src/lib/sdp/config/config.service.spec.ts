import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';


describe('ConfigService', () => {
    let configService: ConfigService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConfigService,
            ],
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ]
        });

        configService = TestBed.get(ConfigService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should load config data from url', (done) => {
        // ARRANGE
        const url = '/settingsurl.json';

        // ACT
        configService.load(url).subscribe(() => {
            const setting = configService.get('setting');
            expect(setting).toEqual('value');
            done();
        });
        httpTestingController.expectOne(url).flush({ setting: 'value' });

        // ASSERT

    });
});

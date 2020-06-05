import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { KeyValueStoreService, HCSClient, ConfigService, LanguageService, AuthService, getLocales } from '@fecommerce-workspace/data-store-lib';

@Component({
  selector: 'fe-login',
  animations: [
    trigger('title', [
      // ...
      state('not-hide', style({
        transform: 'translateY(0%)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'translateY(-30%)',
        opacity: 0
      })),
      transition('hide => not-hide', [
        animate('0.4s')
      ]),
    ]),
    trigger('content', [
      // ...
      state('not-hide', style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'translateX(-30%)',
        opacity: 0
      })),
      transition('hide => not-hide', [
        animate('0.4s')
      ]),
    ]),
    trigger('image', [
      // ...
      state('not-hide', style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'translateX(30%)',
        opacity: 0
      })),
      transition('hide => not-hide', [
        animate('0.4s')
      ]),
    ]),
  ],
  templateUrl: './fe-login.component.html',
  styleUrls: ['./fe-login.component.scss']
})
export class FeLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isSubmitted = false;
  public errorMessage = '';
  public hidePassword = true;
  public hideCustomerKey = false;
  public displayTitle = false;
  public displayContent = false;
  public displayImg = false;
  public layout: string;

  constructor(private _router: Router,
              private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _store: KeyValueStoreService,
              private _hcs: HCSClient,
              private _lgs: LanguageService,
              private _config: ConfigService) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
}

  ngOnInit() {

    this.hideCustomerKey = false;
    let key = '';
    setTimeout(() => {
      this.displayImg = true;
      setTimeout(() => {
        this.displayTitle = true;
        setTimeout(() => {
          this.displayContent = true;
        }, 400);
      }, 400);
    }, 200);

    this.loginForm = this._formBuilder.group({
      //key: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this._authService.getCustomerKey() !== '') {
      key = this._authService.getCustomerKey();
      // To hide customer key when it copmes from the url.
      if (localStorage.getItem('HIDE_CUSTOMER_KEY') !== null) {
        this.hideCustomerKey = true;
      }
    }

    // Set customer key value in the form.
    if (key !== undefined && key !== '') {
      this.loginForm.patchValue({
        key
      });
    }

  }

  public onSubmit(event) {
    this.isSubmitted = true;

    setTimeout(()=> {
      this._router.navigate(['/home']).then(() => {
        this.isSubmitted = false;
      });
    },2000)
    return;
    this._hcs.login(this.username, this.password, { customerKey: this.key }).subscribe(
      (loginDetails) => {
        localStorage.setItem('CUSTOMER_KEY', this.key);
        this._lgs.resetLanguage(getLocales(this._store, this._config)).subscribe(() => {
          this._router.navigate(['/home']).then(() => {
            this.isSubmitted = false;
          });
        });
      }, (err) => {
        this.errorMessage = 'Your credentials are wrong, please check them.';
        this.isSubmitted = false;
      });
  }

  cleanError(event): void {
    if (event.key !== 'Enter') {
      this.errorMessage = '';
    }
  }

  getErrorResponse(): string {
    return this.errorMessage;
  }

  showPassword() {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  get key() { return this.loginForm.value.key; }

  get username() { return this.loginForm.value.user; }

  get password() { return this.loginForm.value.password; }

}

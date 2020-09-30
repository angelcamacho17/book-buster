import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { KeyValueStoreService, HCSClient, ConfigService, LanguageService, AuthService, getLocales, setCurrentUserRequest } from '@fecommerce-workspace/data';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { MainService } from '../main/main.service';

@Component({
  selector: 'login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

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
              private _mainSer: MainService) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
  ngAfterViewInit(): void {
    // setTimeout(()=>{
    //   document.getElementById('dum').focus();
    // },200)
    this.loginForm.controls['username'].markAsPristine();
    this.loginForm.controls['username'].markAsUntouched();
    this.loginForm.controls['username'].markAsPristine();
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
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  public onSubmit(event) {
    this.isSubmitted = true;

    setTimeout(()=> {
      this._mainSer.login(this.username, this.password).subscribe((res)=>{
        this.isSubmitted = false;
        if(res) {
          this._router.navigate(['/main/home'])
        } else {
          this.errorMessage = 'Your credentials are wrong, please check them.';
        }
      })
    },2000)
    return;
    // this._hcs.login(this.username, this.password, { customerKey: this.key }).subscribe(
    //   (loginDetails) => {
    //     localStorage.setItem('CUSTOMER_KEY', this.key);
    //     this._lgs.resetLanguage(getLocales(this._store, this._config)).subscribe(() => {
    //       this._router.navigate(['/home']).then(() => {
    //         this.isSubmitted = false;
    //       });
    //     });
    //   }, (err) => {
    //     this.errorMessage = 'Your credentials are wrong, please check them.';
    //     this.isSubmitted = false;
    //   });
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

  get username() { return this.loginForm.value.username; }

  get password() { return this.loginForm.value.password; }

}

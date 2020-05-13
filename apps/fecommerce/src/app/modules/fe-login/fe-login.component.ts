import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'fe-login',
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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.hideCustomerKey = false;
    let key;
    setTimeout(() => {
      this.displayTitle = true;
      setTimeout(() => {
        this.displayContent = true;
        setTimeout(() => {
          this.displayImg = true;
        }, 400);
      }, 400);
    }, 200);

    this.loginForm = this._formBuilder.group({
      key: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // Set customer key value in the form.
    if (key !== undefined && key !== '') {
      this.loginForm.patchValue({
        key
      });
    }

  }

  public onSubmit(event) { }

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

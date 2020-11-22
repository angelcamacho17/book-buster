import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HCSClient, TranslationService } from '@fecommerce-workspace/data';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public signForm: FormGroup;
  public isSubmitted = false;
  public errorMessage = '';
  public hidePassword = true;

  constructor(private _formBuilder: FormBuilder,
    private _hcs: HCSClient,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _transSer: TranslationService) { 

        this.signForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            password: ['', [Validators.required]],
            confirmPass: ['', [Validators.required]],
            });
}

  ngOnInit() {}

  onSubmit(): void {
    if (this.signForm.value.password !== this.signForm.value.confirmPass) {
      this.isSubmitted = false;
      this.errorMessage = 'd';
      return;
    }
    this.isSubmitted = true;
    
    setTimeout(()=> {
      localStorage.setItem('NEW_USER_' + this.signForm.value.username, JSON.stringify({
        name: this.signForm.value.username,
        mail: this.signForm.value.email,
        password: this.signForm.value.password,


      }))
      localStorage.setItem('NEW_USER_' + this.signForm.value.email, JSON.stringify({
        name: this.signForm.value.username,
        mail: this.signForm.value.email,
        password: this.signForm.value.password,


      }))
      this._router.navigate(['/']);
    },2000)



  // signup(signupRequest)
  // .then(response => {  
  //   this._router.navigate(['/login']);
  //   let msg = this._transSer.get('signupOK');
  //   this.isSubmitted = false;
  //   this._snackBar.open(msg, '', {
  //     duration: 4000,
  //   });
  // }).catch(error => {
  //   let msg = this._transSer.get('signupErr');
  //   this.isSubmitted = false;
  //   this._snackBar.open(msg, '', {
  //     duration: 4000,
  //   });
  // })
}

    /**
   * Clear any error of the
   * loggin fields.
   * @param event event
   */
  public cleanError(event): void {
    if (event.key !== 'Enter') {
      this.errorMessage = '';
    }
  }

  /**
   * Get if there is any loggin error.
   * @returns string
   */
  public getErrorResponse(): string {
    return this.errorMessage;
  }

  /**
   * Handle hide/show password.
   */
  public showPassword(): void {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  get name() { return this.signForm.value.name; }

  get username() { return this.signForm.value.username; }

  get email() { return this.signForm.value.email; }

  get password() { return this.signForm.value.password; }

}

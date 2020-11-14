import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  public createForm: FormGroup;
  public isSubmitted = false;
  public errorMessage = '';
  public hidePassword = true;

  constructor(private _formBuilder: FormBuilder) { 

        this.createForm = this._formBuilder.group({
            title: ['', [Validators.required]],
            author: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            year: ['', [Validators.required]],
            price: ['', [Validators.required]],
            img: ['', [Validators.required]],
            });
  }

  ngOnInit() {}

  onSubmit(): void {
    // if (this.createForm.value.password !== this.createForm.value.confirmPass) {Í
    //   this.isSubmitted = false;
    //   return;
    // }
    this.isSubmitted = true;
  //   const signupRequest = {
  //     username: this.createForm.value.username,
  //     email: this.createForm.value.email,
  //     password: this.createForm.value.password,
  //     confirmPass: this.createForm.value.confirmPass
  // };



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

  get title() { return this.createForm.value.title; }

  get author() { return this.createForm.value.author; }

  get year() { return this.createForm.value.year; }

  get price() { return this.createForm.value.price; }

  get img() { return this.createForm.value.img; }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

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
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "";
  editFile: boolean = true;
  removeUpload: boolean = false;


  constructor(private _formBuilder: FormBuilder, 
    private mainSer: MainService) { 

        this.createForm = this._formBuilder.group({
            title: ['', [Validators.required]],
            author: ['', [Validators.required]],
            year: ['', [Validators.required]],
            price: ['', [Validators.required]],
            img: [null, [Validators.required]],
            });
  }

  ngOnInit() { }

  public uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.createForm.patchValue({
          img: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
    }
  }

  public removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.editFile = true;
    this.removeUpload = false;
    this.createForm.patchValue({
      img: [null]
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.createForm.valid) {
      this.isSubmitted = false;
      return;
    }
    const bookRequest = {
      id: this.mainSer.books.length + 1,
      title: this.createForm.controls.title.value,
      author: this.createForm.controls.author.value,
      price: this.createForm.controls.price.value,
      owner: this.mainSer.currentUser,
      img: this.createForm.controls.img.value,
      year: this.createForm.controls.year.value
    };

    this.mainSer.createBook(bookRequest);


   

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

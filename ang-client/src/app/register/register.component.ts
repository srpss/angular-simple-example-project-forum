import { Component, OnInit } from '@angular/core';
import { Register } from './register';
import { Store } from '@ngrx/store'
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/utils/validators';

import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  onClickSubmit() {


  }

  form!: FormGroup;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private HttpClient: HttpClient,
    private store: Store,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) {

  }
  ngOnInit() {
    this.form = this.formBuilder.group(
      {

        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      this.form.value.role = 'admin';


      return;
    }


    const { username, password } = this.form.value;

    this.authService.register(username, password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      }
      ,
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
   setTimeout(() =>{
    if(this.isLoginFailed !== true){
      this.authService.login(username, password).subscribe({
        next :(data) => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
         
          this.router.navigate(['/'])}
          ,
          error : (err)=>{
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
        
        }
      );
    }
   }, 1000) 
 
  }
  // reloadPage(): void {
  //   window.location.reload();
  // }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}

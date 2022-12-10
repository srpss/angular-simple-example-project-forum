import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBoards } from '../repos';
import {Store} from '@ngrx/store'

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/utils/validators'; 
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

export interface IForm{

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form: any ={
    username: null,
    password: null
  };
  submitted = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  constructor(
    private HttpClient:HttpClient,
    private store: Store ,
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router ){

  }
  ngOnInit(){
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
      
       
      }
    );

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
     
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
    
      return;
    }

   // console.log(JSON.stringify(this.form.value, null, 2));

    const { username, password } = this.form.value;

    this.authService.login(username, password).subscribe({
      next :(data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
        this.router.navigate(['/'])}
        ,
        error : (err)=>{
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  }


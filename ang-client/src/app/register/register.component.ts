import { Component, OnInit } from '@angular/core';
import { Register } from './register';
import { Store } from '@ngrx/store'
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/utils/validators';

import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserState, UserStore } from '../store/user-store';
import { ImageStore } from '../store/image-store';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  form!: FormGroup;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  public user$: Observable<string>;
  public image$: Observable<string>;

  constructor(private HttpClient: HttpClient,
    private store: Store,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private userStore: UserStore,
    private imageStore: ImageStore) {
      this.user$ = this.userStore.selectUser();
      this.image$ = this.imageStore.selectUser();
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
      error: ((err: any) => {
        this.isLoginFailed = true;
         throw Error(err)}) 

        
        
    });

    if(this.isLoginFailed = false){
   setTimeout(() =>{
    if(this.isLoginFailed !== true){
      this.authService.login(username, password).subscribe({
        next :(data) => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.userStore.change(data.username)
          this.imageStore.change(data.image)

          this.router.navigate(['/'])}
          ,
      error: ((err: any) => {
        
         throw Error(err)}) 

        
        }
      );
    }
   }, 1000) 
  }
  }
  reloadPage(): void {
    window.location.reload();
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}

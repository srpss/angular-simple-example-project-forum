
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  form: any ={
    originalPoster: null,
    image: null
  };
  submitted = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  constructor(
 
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router ){

  }
  ngOnInit(){
    this.form = this.formBuilder.group(
      {
     
        originalPoster: [
          '',
          [
            Validators.required,
            Validators.maxLength(20)
          ]
        ],
       
        image: [
          '',
          [
            Validators.required,
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

    const { originalPoster, image } = this.form.value;

    this.authService.login(originalPoster, image).subscribe({
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
  reloadPage(): void {
    window.location.reload();
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  isItLogged(){
    this.isLoggedIn = !!this.tokenStorage.getToken();
   
    return this.isLoggedIn
  }
  
  }


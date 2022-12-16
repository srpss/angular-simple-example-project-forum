
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { ThreadService } from 'src/app/_services/thread.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: any = {
    originalPoster: null,
    image: null
  };
  submitted = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  constructor(

    private formBuilder: FormBuilder,
    private thrService: ThreadService,
    private tokenStorage: TokenStorageService,
    private router: Router) {

  }
  ngOnInit() {
   
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

    const USER_KEY = 'auth-user';
    const user = (window.sessionStorage.getItem(USER_KEY));
    let currentUser = user !== null ? JSON.parse(user) : "";

    this.thrService.create(originalPoster, image, currentUser.username).subscribe({
      next: (data) => {

        this.router.navigate(["thread/" + data._id])
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },

    }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  isItLogged() {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    return this.isLoggedIn
  }

}


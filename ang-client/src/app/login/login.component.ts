import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { UserStore } from '../store/user-store';
import { Observable } from 'rxjs';
import { ImageStore } from '../store/image-store';

export interface IForm {

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  submitted = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  public user$: Observable<string>;
  public image$: Observable<string>;

  constructor(
    private HttpClient: HttpClient,
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
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.userStore.change(data.username)
        this.imageStore.change(data.image)

        this.router.navigate(['/'])
      },
      error: ((err: any) => {throw Error(err)}) 

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


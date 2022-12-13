import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TokenStorageService } from '../_services/token-storage.service';
import { UpdateUser } from '../_services/update-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  form: any = {
    username: null,
    image: null
  };

  // formPass: any ={
  //   password: null,
  // };
  submitted = false;

  errorMessage = '';

  constructor(private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private userUpdate: UpdateUser,

  ) {

  }
  userInfo = this.tokenStorage.getUser();
 
 getImage(){
    const image = this.userInfo.image
    
     return image;
  }

  currentUsername: any;
  currentImage: any;
  subscription: any;

  ngOnInit() {

   
    this.form = this.formBuilder.group(
      {

        username: [
          this.userInfo.username,
          [ 
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],

        image: [
          this.userInfo.image,
          [
            Validators.required,
          ]
        ],


      }
    );

  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }




  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {

      return;
    }
    const userForm = this.form.value;

    this.userUpdate.update(userForm.username, userForm.image).subscribe({
      next: () => {

        const USER_KEY = 'auth-user';

        const user = (window.sessionStorage.getItem(USER_KEY)) ;
        let currentUser = user !== null ? JSON.parse(user) : "";
    
        currentUser.username = userForm.username;
        currentUser.image = userForm.image;
        this.tokenStorage.saveUser(currentUser);
   

      }
      ,
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    }
    );
    // this.userUpdate.getUser().subscribe({
    //   next:(data) =>{
    //     this.tokenStorage.saveUser(data);
    //   }  ,
    //   error: (err) => {
    //     this.errorMessage = err.error.message;
    //   }
    // })

    const { username, image } = this.form.value;

  }

  onSubmitPassword() {

  }
}

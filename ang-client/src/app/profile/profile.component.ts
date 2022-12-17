import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { TokenStorageService } from '../_services/token-storage.service';
import { UpdateUser } from '../_services/update-user.service';
import { Observable } from 'rxjs';
import { CounterStore } from '../store/counter-store';
import { UserState, UserStore } from '../store/user-store';
import { ImageStore } from '../store/image-store';

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
  public counter$: Observable<number>;
  public user$: Observable<string>;
  public image$: Observable<string>;
 
  constructor(private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private userUpdate: UpdateUser,
    public counterStore: CounterStore,
    public userStore: UserStore ,
    private imageStore: ImageStore
  ) {
    this.counter$ = this.counterStore.selectCount();
    this.user$ = this.userStore.selectUser();
    this.image$ = this.imageStore.selectUser();
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
        this.userStore.change(userForm.username)
        this.imageStore.change(userForm.image)

      }
      ,
      error: ((err: any) => {
       
         throw Error(err)}) 
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

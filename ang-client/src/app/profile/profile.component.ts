import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  form: any ={
    originalPoster: null,
    image: null
  };
  submitted = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

constructor(private tokenStorage: TokenStorageService,
  private formBuilder: FormBuilder,

  ){

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

}
 userInfo = this.tokenStorage.getUser();  

}

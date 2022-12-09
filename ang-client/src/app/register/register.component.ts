import { Component, OnInit } from '@angular/core';
import { Register } from './register';
import {Store} from '@ngrx/store'
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/utils/validators'; 

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

  constructor(private HttpClient:HttpClient,private store: Store ,private formBuilder: FormBuilder){

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
      this.form.value.role ='admin';
     
      
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
    
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../store/board.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({boardEntries: boardReducer})
  ]
})
export class LoginModule { }

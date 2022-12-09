import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Register } from './register';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { boardReducer } from '../store/board.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({boardEntries: boardReducer})
  ]
})
export class RegisterModule {




 }

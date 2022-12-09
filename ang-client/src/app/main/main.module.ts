import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BoardService } from '../APIService';
import { MainComponent } from './main.component';

import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../store/board.reducer';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    StoreModule.forRoot({boardEntries: boardReducer})
  ],
  providers: [BoardService],
  bootstrap: [MainComponent]
})
export class MainModule { }

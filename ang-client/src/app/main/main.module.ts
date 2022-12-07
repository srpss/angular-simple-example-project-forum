import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BoardService } from '../APIService';
import { MainComponent } from './main.component';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule
  ],
  providers: [BoardService],
  bootstrap: [MainComponent]
})
export class MainModule { }

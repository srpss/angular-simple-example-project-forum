import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardService } from '../APIService';
import { repos } from '../repos';
import { HttpClientModule } from '@angular/common/http';
import { Board } from './board';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements HttpClientModule, OnInit{
  repos: repos[] = [];
  loading: boolean = false;
  errorMessage: string = "";
  
  constructor(private BoardService: BoardService) {

  }

  public getRepos() {
    this.loading = true;
    this.errorMessage = "";
     this.BoardService.getRepos()
      .subscribe((response) => {
        console.log("got it")
        this.repos = response;
        console.log(this.repos)
      })
  }
  
 public onUpdate(){
  this.ngOnInit()
  }

 ngOnInit(): void {
   this.getRepos()
 }





}

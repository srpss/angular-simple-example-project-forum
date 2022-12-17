import { Component, OnInit } from '@angular/core';

import { BoardService } from '../APIService';
import { repos } from '../repos';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { Router } from '@angular/router';
import { UserStore } from '../store/user-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements HttpClientModule, OnInit{
  repos: repos[] = [];
  loading: boolean = false;
  errorMessage: string = "";
  public user$: Observable<string>;
  constructor(private BoardService: BoardService,
    private router: Router,
    public userStore: UserStore) {
      this.user$ = this.userStore.selectUser();
  }

  public getRepos() {
    this.loading = true;
    this.errorMessage = "";
     this.BoardService.getRepos()
      .subscribe((response) => {
       // console.log("got it")
       const tempData:repos[] = response;
        this.repos = tempData.sort(
          (objA, objB) => new Date(objB.date).getDate() - new Date(objA.date).getDate(),
        );
        //console.log(this.repos)
      })
  }
  
 public onUpdate(){
  this.ngOnInit()
  }

 ngOnInit(): void {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   this.getRepos()
 }

 onDelete(id: string){

  this.BoardService.deleteThread(id).subscribe((response) => {
    this.onUpdate()
   });

 }

 handleError(){
  
 }


}

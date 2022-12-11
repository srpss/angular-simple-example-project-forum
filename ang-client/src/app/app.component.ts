import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorageService } from './_services/token-storage.service';
import { BehaviorSubject, Observable, of , from} from 'rxjs';
import { Store } from '@ngrx/store';
import { toggle } from './store/logged.reducer';
import { logged, notLogged } from './store/logged.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent implements OnInit, HttpClientModule{

 

  isLoggedIn = this.tokenStorage.getUser();
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;


  constructor(
    private tokenStorage: TokenStorageService, private store:Store<{test:boolean}>, private cd: ChangeDetectorRef
    ,
    private router: Router) {
    
  }

  isItLogged(){
    this.isLoggedIn = !!this.tokenStorage.getToken();
   
    return this.isLoggedIn
  }

  ngOnInit(): void{
    this.isLoggedIn = !!this.tokenStorage.getToken();
    
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.username = user.username;
 
    }
  }
  logout(){
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
    this.cd.detectChanges();
  }


}

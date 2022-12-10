import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorageService } from './_services/token-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent implements OnInit, HttpClientModule{

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;


  constructor(
    private tokenStorage: TokenStorageService,
    ) {
  
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
    window.location.reload();
  }




}

import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorageService } from './_services/token-storage.service';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { ImageStore } from './store/image-store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent implements OnInit, HttpClientModule {


  owner: boolean = false;
  isLoggedIn = this.tokenStorage.getUser();
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  public image$: Observable<string>;

  constructor(
    private tokenStorage: TokenStorageService, 
   
    private cd: ChangeDetectorRef,
    private router: Router,
    private imageStore: ImageStore) {
      this.image$ = this.imageStore.selectUser();
  }

  isItLogged() {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    return this.isLoggedIn
  }

  isOwner(){
    
    return this.owner
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.username = user.username;

    }
  }
  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
    this.cd.detectChanges();
  }


}

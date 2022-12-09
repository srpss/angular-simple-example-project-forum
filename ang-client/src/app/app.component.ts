import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent implements HttpClientModule{
  constructor(
    private tokenStorage: TokenStorageService,
    ) {
  
  }

  logout(){
    this.tokenStorage.signOut();
  }
}

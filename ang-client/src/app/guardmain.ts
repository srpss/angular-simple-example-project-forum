import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";

import { TokenStorageService } from './_services/token-storage.service';
  
@Injectable()
export class guardMain implements CanActivate {
    isLoggedIn= this.tokenStorage.getUser()
    constructor(
        private router: Router,
        private tokenStorage: TokenStorageService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
            this.isLoggedIn = !!this.tokenStorage.getToken();
   
            console.log(this.isLoggedIn)
        if (this.isLoggedIn) {
            this.router.navigate(['/']);
        }
        
        return true;
    }
}
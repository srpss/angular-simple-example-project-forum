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
export class AuthGuard implements CanActivate {
    isLoggedIn= this.tokenStorage.getUser()
    constructor(
        private router: Router,
        private tokenStorage: TokenStorageService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
            this.isLoggedIn = !!this.tokenStorage.getToken();
   
            
        if (!this.isLoggedIn) {
            this.router.navigate(['/login']);
        }
        else{
            this.router.navigate(['/']);
        }
        return this.isLoggedIn;
    }
}
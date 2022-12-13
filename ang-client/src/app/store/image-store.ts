import { Injectable } from '@angular/core';
import { NgSimpleStateBaseStore } from 'ng-simple-state';
import { Observable } from 'rxjs';

export interface UserState {
  image: string
}
const USER_KEY = 'auth-user';
const user = (window.sessionStorage.getItem(USER_KEY)) ;
let currentUser = user !== null ? JSON.parse(user) : "";
    
@Injectable()
export class ImageStore extends NgSimpleStateBaseStore<UserState> {

  initialState(): UserState {
    return {
      image: currentUser.image,
    };
  }

  selectUser(): Observable<string> {
    return this.selectState(state => state.image);
  }

  change(changes: string): void {
    this.setState(state => ({ image: changes}));


    }

    reset(): void{
      this.setState(state => ({image: ''}))
    }
      
  }

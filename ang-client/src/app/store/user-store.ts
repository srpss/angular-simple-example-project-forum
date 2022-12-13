import { Injectable } from '@angular/core';
import { NgSimpleStateBaseStore } from 'ng-simple-state';
import { Observable } from 'rxjs';

export interface UserState {
  username: string
}
const USER_KEY = 'auth-user';
const user = (window.sessionStorage.getItem(USER_KEY)) ;
let currentUser = user !== null ? JSON.parse(user) : "";
    
@Injectable()
export class UserStore extends NgSimpleStateBaseStore<UserState> {

  initialState(): UserState {
    return {
      username: currentUser.username,
    };
  }

  selectUser(): Observable<string> {
    return this.selectState(state => state.username);
  }

  change(changes: string): void {
    this.setState(state => ({ username: changes}));


    }

    reset(): void{
      this.setState(state => ({username: ''}))
    }
      
  }

import { Injectable } from '@angular/core';
import { NgSimpleStateBaseStore } from 'ng-simple-state';
import { Observable } from 'rxjs';

export interface ErrorState {
  error: any
}
const USER_KEY = 'auth-user';
const user = (window.sessionStorage.getItem(USER_KEY));
let currentUser = user !== null ? JSON.parse(user) : "";

@Injectable()
export class ErrorStore extends NgSimpleStateBaseStore<ErrorState> {

  initialState(): ErrorState {
    return {
      error: currentUser.username,
    };
  }

  selectUser(): Observable<string> {
    return this.selectState(state => state.error);
  }

  change(changes: string): void {
    this.setState(state => ({ error: changes }));
  }

  reset(): void {
    this.setState(state => ({ error: '' }))
  }

}

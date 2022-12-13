import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';


interface theUser {
  username: string,
  image: string;
}

@Injectable()
export class CounterService {

  constructor(private tokenStorage: TokenStorageService) { }
  userInfo = this.tokenStorage.getUser();
  private InitialUser: theUser = {username: this.userInfo.username, image: this.userInfo.image};
  private userTracker = new BehaviorSubject<theUser>(this.InitialUser);

  /** Allows subscription to the behavior subject as an observable */
  getCount(): Observable<theUser> {
    return this.userTracker.asObservable();
  }


  setUser(username: string, delta: string, image: string, delta2: string): void {
    console.log(username, image)
    this.userTracker.next({username: delta, image: delta2});
  }

  /** Resets the count to the initial value */
  resetUSer(): void {
    this.userTracker.next(this.InitialUser);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const USER_KEY = 'auth-user';

const UPDATE_API = 'http://localhost:8080/user/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UpdateUser {
  constructor(private http: HttpClient) { }

  update(username: string, image: string): Observable<any> {
    const user = (window.sessionStorage.getItem(USER_KEY)) ;
    const currentUser = user !== null ? JSON.parse(user) : "";

    const id = currentUser.id;

    return this.http.post(UPDATE_API + id, {
      
   username,
   image

    }, httpOptions);
    
  }
 
  getUser(): Observable<any>{
    const user = (window.sessionStorage.getItem(USER_KEY)) ;
    const currentUser = user !== null ? JSON.parse(user) : "";
 
    const id = currentUser.id;
    return this.http.get(UPDATE_API + id)
  }

}

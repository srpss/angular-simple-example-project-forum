import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
 
import { repos,IBoards } from './repos';
import { Register } from './register/register';
 
@Injectable()
export class BoardService {
 
  baseURL: string = "http://127.0.0.1:8080";
 
  constructor(public http: HttpClient) {
   
  }
 
 
  getRepos(): Observable<any> {
    
    return this.http.get(this.baseURL + "/boards",{headers: {'x-access-token':'test'}})
  }
 
  
}

@Injectable()
export class RegisterService{

  baseURL: string = "http://127.0.0.1:8080";
 
  constructor(public http: HttpClient) {
  }

 
}
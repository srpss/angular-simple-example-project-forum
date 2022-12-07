import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
 
import { repos,IBoards } from './repos';
 
@Injectable()
export class BoardService {
 
  baseURL: string = "http://127.0.0.1:8080/boards";
 
  constructor(public http: HttpClient) {
  }
 
  getRepos(): Observable<any> {
    return this.http.get(this.baseURL)
  }
 
}
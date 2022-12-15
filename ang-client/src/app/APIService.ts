import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
 
import { repos,IBoards } from './repos';
import { Register } from './register/register';
 


interface IThread{
    
  "_id": string,
  "originalPoster": string,
  "image":string,
  "owner":string,
  "date": string,
  "description": string[],
  "__v": number

}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class BoardService {
  
  baseURL: string = "http://127.0.0.1:8080";
 
  constructor(public http: HttpClient) {
   
  }
 

  getRepos(): Observable<any> {
    
    return this.http.get(this.baseURL + "/boards",{})
  }
  getThread(id: string): Observable<any> {
    
    return this.http.get(this.baseURL + "/boards/" + id,{})
  }
  deleteThread(id: string):Observable<any>{
    console.log(id)
    return this.http.post(this.baseURL + "/boards/delete/" + id,{}, httpOptions)
    
  }
}

@Injectable()
export class RegisterService{

  baseURL: string = "http://127.0.0.1:8080";
 
  constructor(public http: HttpClient) {
  }

 
}
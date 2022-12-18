import { Injectable } from '@angular/core';
 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,  } from 'rxjs';


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

    return this.http.post(this.baseURL + "/boards/delete/" + id,{}, httpOptions)
    
  }
  deleteComment(id: string, _id:string){
 
    return this.http.get(this.baseURL + "/deleteBoardDesc/" + id + "/" + _id,{})
  }
  addComment( id:string,owner:string,comment: string, image:string){
 
    return this.http.post(this.baseURL + "/boards/" + id , {
      
      owner,
      comment,
      image

    },httpOptions)
  }
}

@Injectable()
export class RegisterService{

  baseURL: string = "http://127.0.0.1:8080";
 
  constructor(public http: HttpClient) {
  }

 
}
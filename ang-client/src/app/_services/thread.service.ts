import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const HOST_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  constructor(private http: HttpClient) { }

  create(originalPoster: string, image: string, owner: string): Observable<any> {

    return this.http.post(HOST_API + 'boards', {
      
      originalPoster,
      image,
      owner

    }, httpOptions);
  }

  
}

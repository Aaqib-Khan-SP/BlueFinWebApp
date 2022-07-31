import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http:HttpClient) { }
  baseURL = 'https://bluefinapi.azurewebsites.net/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(credentials: Credentials):Observable<any>{
    return this.http.post(this.baseURL+"Login/login",credentials,this.httpOptions);
  }

  getStock(shopID : string):Observable<any>{
    return this.http.get(this.baseURL+"Domain/GetItems/"+shopID,this.httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials, CustomerFullDetails, Item, Order } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }
  baseURL = 'https://bluefinapi.azurewebsites.net/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getToken(credentials: Credentials): Observable<any> {
    return this.http.post(this.baseURL + "Login/getToken", credentials, this.httpOptions);
  }

  login(): Observable<any> {
    return this.http.get(this.baseURL + "Login/login", this.httpOptions);
  }

  register(credentials: Credentials): Observable<any> {
    return this.http.post(this.baseURL + "Login/register", credentials, this.httpOptions);
  }

  getStock(shopID: string): Observable<any> {
    return this.http.get(this.baseURL + "Domain/GetItems/" + shopID, this.httpOptions);
  }

  placeOrder(order: Order): Observable<any> {
    return this.http.post(this.baseURL + "Order/AddOrder", order, this.httpOptions);
  }

  deleteItemInCart(itemId: string): Observable<any> {
    return this.http.delete(this.baseURL + "Cart/removeItem/" + itemId, this.httpOptions);
  }

  addItemInCart(item: Item): Observable<any> {
    return this.http.post(this.baseURL + "Cart/addItem", item, this.httpOptions);
  }

  updateUser(customerDetails :CustomerFullDetails):Observable<any> {
    return this.http.put(this.baseURL + "User/update", customerDetails, this.httpOptions);
  }
}

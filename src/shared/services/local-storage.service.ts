import { Injectable } from '@angular/core';
import { GlobalConstants } from '../GlobalConstants';
import { Item, Stock } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  updateStock(stock : Stock){
    localStorage.setItem(GlobalConstants.STOCK,JSON.stringify(stock));
  }

  getStock():Item[]{
    return JSON.parse(localStorage.getItem(GlobalConstants.STOCK) || '{}');
  }

  getAccessToken():string{
    return JSON.parse(localStorage.getItem(GlobalConstants.ACCESS_TOKEN) || '{}');
  }

  setAccessToken(token:string){
    localStorage.setItem(GlobalConstants.ACCESS_TOKEN,JSON.stringify(token));
  }
}

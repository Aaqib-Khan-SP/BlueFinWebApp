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
}

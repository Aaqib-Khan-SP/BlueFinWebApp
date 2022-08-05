import { Injectable } from '@angular/core';
import { GlobalConstants } from '../GlobalConstants';
import { Item, Stock } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  updateStock(stock: Stock) {
    localStorage.setItem(GlobalConstants.STOCK, JSON.stringify(stock));
  }

  getStock(): Item[] {
    return JSON.parse(localStorage.getItem(GlobalConstants.STOCK) || '{}');
  }

  getAccessToken(): string {
    return JSON.parse(localStorage.getItem(GlobalConstants.ACCESS_TOKEN) || '{}');
  }

  setAccessToken(token: string) {
    localStorage.setItem(GlobalConstants.ACCESS_TOKEN, JSON.stringify(token));
  }

  getCartItems(): Item[] {
    return JSON.parse(localStorage.getItem(GlobalConstants.CART) || '[]')
  }

  addItemToCart(item: Item) {
    let items: Item[] = this.getCartItems();
    items.push(item);
    localStorage.setItem(GlobalConstants.CART, JSON.stringify(items));
  }

  updateItemInCart(index: number, item: Item) {
    let items: Item[] = this.getCartItems();
    items[index] = item;
    localStorage.setItem(GlobalConstants.CART, JSON.stringify(items));
  }

  removeItemInCart(index:number){
    let items: Item[] = this.getCartItems();
    items.splice(index,1);
    localStorage.setItem(GlobalConstants.CART, JSON.stringify(items));
  }
}

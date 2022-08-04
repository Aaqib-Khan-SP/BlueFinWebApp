import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models';
@Injectable({
  providedIn: 'root'
})
export class DataTransmitterService {

  private cartItem = new BehaviorSubject( Item as unknown as Item);
  currentCartItem = this.cartItem.asObservable();

  constructor() { 

  }
  
  updateCartItems(item:Item){
    this.cartItem.next(item);
  }
}

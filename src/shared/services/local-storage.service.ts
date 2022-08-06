import { Injectable } from '@angular/core';
import { GlobalConstants } from '../GlobalConstants';
import { CustomerData, CustomerFullDetails, Item, Order, Stock } from '../models';

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

  addItemsToCart(items: Item[]) {
    localStorage.setItem(GlobalConstants.CART, JSON.stringify(items));
  }

  updateItemInCart(index: number, item: Item) {
    let items: Item[] = this.getCartItems();
    items[index] = item;
    localStorage.setItem(GlobalConstants.CART, JSON.stringify(items));
  }

  removeItemInCart(index: number) {
    let items: Item[] = this.getCartItems();
    items.splice(index, 1);
    localStorage.setItem(GlobalConstants.CART, JSON.stringify(items));
  }

  deleteUserData() {
    localStorage.removeItem(GlobalConstants.CART);
    localStorage.removeItem(GlobalConstants.CUSTOMER_DATA);
    localStorage.removeItem(GlobalConstants.ACCESS_TOKEN);
  }

  emptyCart() {
    localStorage.removeItem(GlobalConstants.CART);
  }

  isAccessTokenSet() {
    let token = localStorage.getItem(GlobalConstants.ACCESS_TOKEN);
    if (token == null || token == undefined) {
      return false;
    }
    else { return true; }
  }

  getCustomerData():CustomerData {
    return JSON.parse(localStorage.getItem(GlobalConstants.CUSTOMER_DATA) || '{}')
  }

  setCustomerData(customerData: CustomerData) {
    localStorage.setItem(GlobalConstants.CUSTOMER_DATA, JSON.stringify(customerData));
  }

  updateCustomerDetails(customerDetails: CustomerFullDetails) {
    let customerData: CustomerData = this.getCustomerData();
    customerData.customerDetails = customerDetails
    localStorage.setItem(GlobalConstants.CUSTOMER_DATA, JSON.stringify(customerData));
  }

  updateCustomerOrder(order: Order) {
    let customerData: CustomerData = this.getCustomerData();
    let index: number = customerData.orders.findIndex(o => o.orderId == order.orderId);
    if (index != -1) {
      customerData.orders[index] = order;
      localStorage.setItem(GlobalConstants.CUSTOMER_DATA, JSON.stringify(customerData));
    }
  }
  
  refreshCustomerOrders(order:Order){
    let customerData: CustomerData = this.getCustomerData();
    customerData.orders.push(order);
    this.setCustomerData(customerData);
  }

  getCustomerOrders(){
    let customerData: CustomerData = this.getCustomerData();
    return customerData.orders;
  }

}

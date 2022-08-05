import { Component, OnInit } from '@angular/core';
import { Item } from 'src/shared/models';
import { DataTransmitterService } from 'src/shared/services/data-transmitter.service';
import { LocalStorageService } from 'src/shared/services/local-storage.service';
import { SharedService } from 'src/shared/services/shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  count: number = 0;
  cart: Item[];
  total : number;
  constructor(private localStorageService: LocalStorageService, private dataTransmitterService: DataTransmitterService,private sharedService :SharedService) { }

  ngOnInit(): void {
    this.cart = this.localStorageService.getCartItems();
    this.count = this.cart.length;
    
    this.dataTransmitterService.currentCartItem.subscribe(item => {
      this.total = 0;
      if(item.itemId != undefined){
        let existingItem: Item  = this.sharedService.updateItemIfExists(item,this.cart);
        let index = this.sharedService.getItemIndexInList(item,this.cart);
        if(index != -1){
          this.cart[index] = existingItem;
        }
        else{
          this.cart.push(item)
          this.count++;
        }
      }
      this.cart.forEach(item => this.total = this.total + item.rate*item.quantity)
    });
  }

  get isTokenSet(){
    return this.localStorageService.isAccessTokenSet()
  }
  
  logOut(){
    this.localStorageService.deleteAccessToken();
  }

  removeItemFromCart(item:Item){
    let index = this.sharedService.getItemIndexInList(item,this.cart);
    if(index != -1){
      this.total = this.total - this.cart[index].rate*this.cart[index].quantity
      this.cart.splice(index,1);
      this.localStorageService.removeItemInCart(index);
      this.count--;
    }
  }

}

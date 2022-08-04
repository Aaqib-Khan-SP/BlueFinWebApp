import { Component, OnInit } from '@angular/core';
import { Item } from 'src/shared/models';
import { DataTransmitterService } from 'src/shared/services/data-transmitter.service';
import { LocalStorageService } from 'src/shared/services/local-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  count: number = 0;
  cart: Item[];
  total : number;
  constructor(private localStorageService: LocalStorageService, private dataTransmitterService: DataTransmitterService) { }

  ngOnInit(): void {
    this.cart = this.localStorageService.getCartItems();
    this.count = this.cart.length;
    
    this.dataTransmitterService.currentCartItem.subscribe(item => {
      this.total = 0;
      if(item.itemId != undefined){
        this.cart.push(item)
        this.count++;
      }
      this.cart.forEach(item => this.total = this.total + item.rate*item.quantity)
    });
  }
}

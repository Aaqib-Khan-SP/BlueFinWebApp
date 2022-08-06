import { Component, OnInit } from '@angular/core';
import { Item, Stock } from 'src/shared/models';
import { DataTransmitterService } from 'src/shared/services/data-transmitter.service';
import { LocalStorageService } from 'src/shared/services/local-storage.service';
import { RestApiService } from 'src/shared/services/rest-api.service';
import { SharedService } from 'src/shared/services/shared.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  tab: string = 'newwomentab';
  stock: Item[];
  cartItems: Item[];
  constructor(private restAPIService: RestApiService, private localStorageService: LocalStorageService, private dataTransmitter: DataTransmitterService, private sharedService: SharedService) { }
  ngOnInit(): void {
    this.getStock();
    this.stock = this.localStorageService.getStock();
  }

  getStock() {
    this.restAPIService.getStock("shop1").subscribe(
      data => {
        this.stock = data.data;
        this.localStorageService.updateStock(data.data);
      }
    );
  }

  addItemToCart(item: Item) {
    this.cartItems = this.localStorageService.getCartItems();
    let existingItem: Item = this.sharedService.updateItemIfExists(item, this.cartItems);
    let index = this.sharedService.getItemIndexInList(item, this.cartItems);
    if (index != -1) {
      this.localStorageService.updateItemInCart(index, existingItem);
      this.dataTransmitter.updateCartItems(existingItem);
    }
    else {
      this.localStorageService.addItemToCart(item);
      this.dataTransmitter.updateCartItems(item);
    }
    this.restAPIService.addItemInCart(item).subscribe(
      data => {
        //item added to cart
      });
  }

  setTab(tab: string) {
    this.tab = tab;
  }
}
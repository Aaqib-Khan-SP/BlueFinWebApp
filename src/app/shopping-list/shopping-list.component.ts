import { Component, OnInit } from '@angular/core';
import { Item, Stock } from 'src/shared/models';
import { DataTransmitterService } from 'src/shared/services/data-transmitter.service';
import { LocalStorageService } from 'src/shared/services/local-storage.service';
import { RestApiService } from 'src/shared/services/rest-api.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  tab: string = 'newwomentab';
  stock: Item[];
  constructor(private restAPIService: RestApiService, private localStorageService: LocalStorageService,private dataTransmitter:DataTransmitterService) { }
  ngOnInit(): void {
    this.getStock();
    this.stock = this.localStorageService.getStock();
  }

  getStock() {
    this.restAPIService.getStock("shop1").subscribe(
      data => {
        this.stock = data;
        this.localStorageService.updateStock(data);
      }
    );
  }

  addItemToCart(item : Item){
    this.localStorageService.addItemToCart(item);
    this.dataTransmitter.updateCartItems(item);
  }

  setTab(tab: string) {
    this.tab = tab;
  }
}
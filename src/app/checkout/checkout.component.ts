import { Component, OnInit } from '@angular/core';
import { Item } from 'src/shared/models';
import { LocalStorageService } from 'src/shared/services/local-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart :Item[];
  total :number = 0;
  addressButton :boolean = true;
  constructor(private localStorageService : LocalStorageService) { }

  ngOnInit(): void {
    this.cart = this.localStorageService.getCartItems();
    this.cart.forEach(item => this.total = this.total + item.rate*item.quantity);
  }

}

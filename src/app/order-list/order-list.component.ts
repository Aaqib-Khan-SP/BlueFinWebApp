import { Component, OnInit } from '@angular/core';
import { Order } from 'src/shared/models';
import { LocalStorageService } from 'src/shared/services/local-storage.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  options :any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.orders = this.localStorageService.getCustomerOrders();
  }

  getTotalForOrder(order: Order) {
    let total = 0;
    order.items.forEach(item => total = total + item.rate * item.quantity);
    return total;
  }

  getOrderStatus(order:Order){
    return order.trackingDetails.trackingItems[order.trackingDetails.trackingItems.length-1].status;
  }

  convertDate(date :Date){
    var simpleDate = new Date(date);
    return simpleDate.toLocaleDateString("en-US", this.options);
  }

}

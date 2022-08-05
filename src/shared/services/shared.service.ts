import { Injectable } from '@angular/core';
import { Item } from '../models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private localStorageService: LocalStorageService) { }

  updateItemIfExists(item: Item, items: Item[]):Item {
    let index = this.getItemIndexInList(item, items);
    if (index != -1) {
      items[index].quantity = items[index].quantity + item.quantity;
      return items[index];
    }
    return item;
  }

  getItemIndexInList(item: Item, items: Item[]) {
    let index = items.findIndex(x => x.itemId == item.itemId);
    return index;
  }
}

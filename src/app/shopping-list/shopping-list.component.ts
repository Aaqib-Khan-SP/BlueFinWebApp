import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  tab:string='newwomentab';
  constructor() { }

  ngOnInit(): void {
  }

  setTab(tab: string) {
    this.tab = tab;
  }

}

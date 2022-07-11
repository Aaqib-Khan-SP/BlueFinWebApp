import { Component, OnInit } from '@angular/core';
import {faCartShopping,faClipboardList,faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faCartShopping = faCartShopping
  faClipboardList = faClipboardList
  faUser = faUser
  constructor() { }
  ngOnInit(): void {
    
  }
}

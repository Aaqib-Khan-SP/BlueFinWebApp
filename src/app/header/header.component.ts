import { Component, OnInit } from '@angular/core';
import { DataTransmitterService } from 'src/shared/services/data-transmitter.service';
import { LocalStorageService } from 'src/shared/services/local-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  count :number = 0;
  constructor(private localStorageService :LocalStorageService,private dataTransmitterService :DataTransmitterService) { }

  ngOnInit(): void {
    this.count = this.localStorageService.getCartItems().length -1;

    this.dataTransmitterService.currentCartItem.subscribe(item =>{
      this.count++;
    });
  }
}

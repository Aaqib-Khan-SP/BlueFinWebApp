import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressDetails, ContactInfo, CustomerFullDetails, CustomerInfoForOrder, Item, Order } from 'src/shared/models';
import { LocalStorageService } from 'src/shared/services/local-storage.service';
import { RestApiService } from 'src/shared/services/rest-api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Item[];
  total: number = 0;
  addressButton: boolean = true;
  order: Order;
  customerDetails: CustomerFullDetails;
  address: AddressDetails | undefined;
  addressFormGroup :FormGroup;

  constructor(private localStorageService: LocalStorageService, private restAPIService: RestApiService) { }

  ngOnInit(): void {
    this.cart = this.localStorageService.getCartItems();
    this.cart.forEach(item => this.total = this.total + item.rate * item.quantity);
    this.customerDetails = this.localStorageService.getCustomerData();
    this.address = this.customerDetails.addresses.find(address => address.type = 'primary');
    if(this.address == undefined){
      this.address = new AddressDetails('','','','',0,'');
    }

    this.addressFormGroup = new FormGroup({
      firstName :new FormControl(null,Validators.required),
      lastName :new FormControl(null,Validators.required),
      addressLine1 :new FormControl(null,Validators.required),
      addressLine2 :new FormControl(),
      city :new FormControl(null,Validators.required),
      landmark :new FormControl(null,Validators.required),
      district :new FormControl(null,Validators.required),
      pincode :new FormControl(null,Validators.required),
      phoneNumber :new FormControl(null,Validators.required),
      emailId :new FormControl(null,Validators.required),
    });
  }

  placeOrder() {
    let contactInfo = new ContactInfo(this.customerDetails.contactInfo.phoneNumber,this.customerDetails.contactInfo.alternateNumber,this.customerDetails.contactInfo.emailId);
    let customerInfoForOrder = new CustomerInfoForOrder(this.customerDetails.customerId,this.customerDetails.firstName,this.customerDetails.lastName,contactInfo);
    this.order = new Order(1, customerInfoForOrder, this.cart);
    this.restAPIService.placeOrder(this.order).subscribe(
      data => {
        this.localStorageService.emptyCart();
      })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  addressFormGroup: FormGroup;

  constructor(private spinner: NgxSpinnerService, private localStorageService: LocalStorageService, private restAPIService: RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.cart = this.localStorageService.getCartItems();
    this.cart.forEach(item => this.total = this.total + item.rate * item.quantity);
    this.customerDetails = this.localStorageService.getCustomerData().customerDetails;
    this.address = this.customerDetails.addresses.find(address => address.type = 'primary');
    if (this.address == undefined) {
      this.address = new AddressDetails('', '', '', '', 0, '');
    }

    this.addressFormGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      addressLine1: new FormControl(null, Validators.required),
      addressLine2: new FormControl(),
      city: new FormControl(null, Validators.required),
      landmark: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      pincode: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      emailId: new FormControl(null, Validators.required),
    });
  }

  placeOrder() {
    this.spinner.show();
    let contactInfo = new ContactInfo(this.customerDetails.contactInfo.phoneNumber, this.customerDetails.contactInfo.alternateNumber, this.customerDetails.contactInfo.emailId);
    let customerInfoForOrder = new CustomerInfoForOrder(this.customerDetails.customerId, this.customerDetails.firstName, this.customerDetails.lastName, this.customerDetails.primaryOutletId, contactInfo, this.address!);
    this.order = new Order(customerInfoForOrder, this.cart);
    this.restAPIService.placeOrder(this.order).subscribe(
      data => {
        this.localStorageService.refreshCustomerOrders(data);
        this.localStorageService.emptyCart();
        this.spinner.hide();
        this.router.navigateByUrl('/orders');
      })
  }

  updateCustomerDetails(){
    this.customerDetails.addresses[0] = this.address!;
    this.localStorageService.updateCustomerDetails(this.customerDetails);
    this.restAPIService.updateUser(this.customerDetails).subscribe(
      data =>{
        console.log(data);
      }
    )
  }

}

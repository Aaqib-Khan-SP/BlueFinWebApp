import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials, Item } from 'src/shared/models';
import { RestApiService } from 'src/shared/services/rest-api.service';
import { FirebaseAuthenticationService } from 'src/shared/services/firebase-authentication.service';
import { LocalStorageService } from 'src/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { DataTransmitterService } from 'src/shared/services/data-transmitter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('signinForm') signInFormID: ElementRef;

  tab: string = 'signin';
  otp: string;
  user: any;
  showOTP: boolean = false;
  signInFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  OTPFormGroup: FormGroup;
  credentials: Credentials;
  cartItems :Item[];
  constructor(private restAPIService: RestApiService, private fbAuthService: FirebaseAuthenticationService,private localStorageService:LocalStorageService,private router :Router,private dataTransmitter :DataTransmitterService) {
  }

  ngOnInit(): void {
    this.fbAuthService.recaptchaInit('recaptcha-container')
    this.signInForm();
    this.registerForm();
  }

  setTab(tab: string) {
    this.tab = tab;
  }

  private signInForm() {
    this.signInFormGroup = new FormGroup({
      phoneNumber: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  private registerForm() {
    this.registerFormGroup = new FormGroup({
      emailId: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    })
  }

  onLoginSubmit() {
    this.credentials = this.signInFormGroup.value;
    this.restAPIService.login(this.credentials).subscribe(
      data => {
        this.cartItems = data.cartItems;
        this.localStorageService.setAccessToken(data.token);
        this.cartItems.forEach(item =>{
          this.localStorageService.addItemToCart(item);
          this.dataTransmitter.updateCartItems(item)
        } );
        this.router.navigateByUrl('/');
      }
    );
  }

  onRegisterSubmit() {
    this.credentials = this.registerFormGroup.value;
    var verificationID = this.fbAuthService.signInWithPhone(this.credentials.phoneNumber);
    if (verificationID != null) {
      this.showOTP = true;
      this.signInFormID.nativeElement.style.display = 'none';
    }
  }

  verifyOTP() {
    this.fbAuthService.verifyCode(this.otp).then((res:any) => {
      this.credentials.userId = res;
      this.restAPIService.register(this.credentials).subscribe(
        data => {
          console.log(data);
        }
      );
    });
  }

}

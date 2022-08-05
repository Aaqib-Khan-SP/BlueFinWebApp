import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingItemComponent } from './shopping-list/shopping-item/shopping-item.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-list/order-item/order-item.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FooterComponent } from './footer/footer.component';
import { CartItemComponent } from './shopping-cart/cart-item/cart-item.component';
import { ItemDetailsComponent } from './shopping-list/item-details/item-details.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { WindowService } from 'src/shared/services/window.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { HeadersInterceptor } from 'src/shared/services/interceptors/headers.interceptor';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingItemComponent,
    OrderListComponent,
    OrderItemComponent,
    MyAccountComponent,
    ShoppingCartComponent,
    FooterComponent,
    CartItemComponent,
    ItemDetailsComponent,
    HeaderComponent,
    LoginComponent,
    CheckoutComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    WindowService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {}
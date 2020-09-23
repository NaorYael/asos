import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './ui/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderComponent} from './ui/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenComponent} from './men/men.component';
import {WomenComponent} from './women/women.component';
import {HttpClientModule} from '@angular/common/http';
import {FooterComponent} from './ui/footer/footer.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SliderComponent} from './slider/slider.component';

import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CheckOutComponent} from './check-out/check-out.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ProductFormComponent} from './admin/product-form/product-form.component';
import {PortalModule} from '@angular/cdk/portal';
import {DialogsModule} from './ui/dialogs/dialogs.module';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenComponent,
    WomenComponent,
    FooterComponent,
    SliderComponent,
    HomeComponent,
    LoginComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    CheckOutComponent,
    ShoppingCartComponent,
    ProductFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    PortalModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    DialogsModule,
    MatCheckboxModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

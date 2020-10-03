import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderComponent} from './ui/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FooterComponent} from './ui/footer/footer.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {LoginComponent} from './auth/login/login.component';
import {OrderSuccessComponent} from './shopping/components/order-success/order-success.component';
import {MyOrdersComponent} from './shopping/components/my-orders/my-orders.component';
import {AdminOrdersComponent} from './admin/components/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './admin/components/admin-products/admin-products.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CheckOutComponent} from './shopping/components/check-out/check-out.component';
import {ShoppingCartComponent} from './shopping/components/shopping-cart/shopping-cart.component';
import {ProductFormComponent} from './admin/components/product-form/product-form.component';
import {PortalModule} from '@angular/cdk/portal';
import {ProductsComponent} from './shopping/components/products/products.component';
import {ProductFilterComponent} from './shopping/components/products/product-filter/product-filter.component';
import {ProductCardComponent} from './shared/components/product-card/product-card.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ProductQuantityComponent} from './shared/components/product-quantity/product-quantity.component';
import {ShoppingCartSummaryComponent} from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import {ShippingFormComponent} from './shopping/components/shipping-form/shipping-form.component';
import {OrderDetailsComponent} from './shared/components/order-details/order-details.component';
import {FavoriteComponent} from './shopping/components/favorite/favorite.component';
import {ReadMorePipe} from './utils/readmore.directive';
import {DialogsModule} from './utils/dialogs/dialogs.module';
import {MaterialModule} from './utils/material.module';
import {CommercialComponent} from './utils/commercial/commercial.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    CheckOutComponent,
    ShoppingCartComponent,
    ProductFormComponent,
    ProductsComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ReadMorePipe,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailsComponent,
    FavoriteComponent,
    CommercialComponent,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    DialogsModule,
    DragDropModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

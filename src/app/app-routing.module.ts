import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {OrderSuccessComponent} from './shopping/components/order-success/order-success.component';
import {MyOrdersComponent} from './shopping/components/my-orders/my-orders.component';
import {AdminProductsComponent} from './admin/components/admin-products/admin-products.component';
import {AdminOrdersComponent} from './admin/components/admin-orders/admin-orders.component';
import {CheckOutComponent} from './shopping/components/check-out/check-out.component';
import {ShoppingCartComponent} from './shopping/components/shopping-cart/shopping-cart.component';
import {AuthGuard} from './auth/auth-guard.service';
import {AdminAuthGuard} from './admin/admin-auth-guard.service';
import {ProductFormComponent} from './admin/components/product-form/product-form.component';
import {ProductsComponent} from './shopping/components/products/products.component';
import {OrderDetailsComponent} from './shared/components/order-details/order-details.component';
import {FavoriteComponent} from './shopping/components/favorite/favorite.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
  {path: 'my-orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
  {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
  {path: 'favorites', component: FavoriteComponent, canActivate: [AuthGuard]},

  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

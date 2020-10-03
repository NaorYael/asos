import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {ShoppingCart} from '../../../shared/models/shopping-cart';
import {Order} from '../../../shared/models/order';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  shipping = {name: '', address1: '', address2: '', city: ''};
  subscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    await this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

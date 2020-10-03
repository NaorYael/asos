import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {OrderService} from '../../services/order.service';
import {ShoppingCart} from '../../../shared/models/shopping-cart';
import {Order} from '../../../shared/models/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input() cart: ShoppingCart;
  shipping = {name: '', address1: '', address2: '', city: ''};
  userId: string;
  userSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(value: any) {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    await this.router.navigate(['/order-success/', result.key]);
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}

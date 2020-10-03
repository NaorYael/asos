import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Observable} from 'rxjs';

import {Router} from '@angular/router';
import {ShoppingCartItem} from '../../../shared/models/shopping-cart-item';
import {ShoppingCart} from '../../../shared/models/shopping-cart';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
  items: ShoppingCartItem[] = [];

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }


  clearCart() {
    this.shoppingCartService.clearCart();
    this.router.navigate(['/']);
  }
}


import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../../shopping/services/shopping-cart.service';
import {Subscription} from 'rxjs';
import {FavoriteService} from '../../../shopping/services/favorite.service';
import {Product} from '../../models/product';
import {ShoppingCart} from '../../models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  cartSub: Subscription;
  cart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService,
              private favoriteService: FavoriteService) {
  }

  async ngOnInit() {
    this.cartSub = (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  onToggle() {
    if (!this.product.isFavorite) {
      this.favoriteService.create(this.product);
      this.product.isFavorite = true;
    }
  }

}

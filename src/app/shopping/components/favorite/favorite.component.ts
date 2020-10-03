import {Component, OnDestroy, OnInit} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {Subscription} from 'rxjs';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {SnackbarService} from '../../services/snackbar.service';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit, OnDestroy {

   products: Product[];
   favSub: Subscription;

  constructor(private favoriteService: FavoriteService,
              private shoppingCartService: ShoppingCartService,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
   this.favSub =  this.favoriteService.getAll().snapshotChanges().subscribe(
      products => {
        this.products = products.map((data:any) => {
          return {
            ...data.payload.val(),
            key: data.key
          } as Product;
        });
      }
    );
  }

  ngOnDestroy() {
    if (this.favSub){this.favSub.unsubscribe()}
  }


  onDelete(productId) {
    this.favoriteService.delete(productId);
  }

  onBuy(product) {
    this.shoppingCartService.addToCart(product);
    this.favoriteService.delete(product.key);
    this.snackbarService.openSnackBar('Product: ' + product.name + ' moved to cart.')
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Product} from '../model/product';
import {JsonService} from '../services/json.service';
import {SnackbarService} from '../services/snackbar.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit ,OnDestroy{

  mediaSub: Subscription;
  sub1: Subscription;
  sub2: Subscription;
  products:Product[] = [];

  addToCartProducts: Product[] = [];
  favoriteProducts: Product[] = [];
  errorMessage: String;
  deviceXs: boolean;
  productId: number;

  constructor(public mediaObserver: MediaObserver,
              public jsonService: JsonService,
              public snackbarService: SnackbarService,
              public productService: ProductService) {
  }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs';
    });
    this.jsonService.getAllMenProducts().subscribe(products => {
      this.products = products,
        error => {
          this.errorMessage = error;
          alert(this.errorMessage);
        };
    });
  }

  addToCart(product: Product) {
    this.sub1 = this.jsonService.getProductWomenById(product.id).subscribe(() => {
        this.productId = product.id;
        product.isFavorite = false;

        // this.productService.addToCart(product);
        // console.log(this.productService.getCartItems());

        this.snackbarService.openSnackBar(product.name + ' Added successful!');
      },
      error => {
        this.errorMessage = error;
        alert(this.errorMessage + 'Added failed.');
      });
  }

  onToggle(product: Product) {
    this.sub2 = this.jsonService.getProductWomenById(product.id).subscribe(() => {
        this.productId = product.id;
        product.isFavorite = !product.isFavorite;
        // this.productService.addToFavorite(product);
        // console.log(this.productService.getFavoriteItems());

      },
      error => {
        this.errorMessage = error;
        alert(this.errorMessage);
      });
  }

  ngOnDestroy(): void {
    if(this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub1.unsubscribe();
    }
  }

}
